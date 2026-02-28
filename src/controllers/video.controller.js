import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Title and description are required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    if (!videoLocalPath) {
        throw new ApiError(400, "Video file not found")
    }
    
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file not found")
    }
    
    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    const createVideo = await Video.create({
        title,
        description,
        videoFile: video.url || "Video not found",
        thumbnail: thumbnail.url || "Thumbnail not found",
        duration: video.duration,
        owner: req.user?._id,
        isPublished: false
    })

    const videoUploaded = await Video.findById(createVideo._id)

    if (!videoUploaded) {
        throw new ApiError(400, "Something went wrong while uploading video")
    }
    
    return res
    .status(200)
        .json(new ApiResponse(200, videoUploaded, "Video uploaded successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if (!isValidObjectId(videoId)) {
        throw new ApiError(405, "Video id not found")
    }
    if (!isValidObjectId(req.user?._id)) {
        throw new ApiError(400, "Invalid userId");
    }

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribers",
                        },
                    },
                    {
                        $addFields: {
                            subscriberCount: {
                                $size: "$subscribers"
                            },
                            isSubscribed: {
                                $cond: {
                                    if: {
                                        $in: [req.user?._id, "$subscribers.subscriber"],
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            "avatar.url": 1,
                            subscriberCount: 1,
                            isSubscribed: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $addFields: {
                likesCount: {
                    $size: "$likes"
                }, 
                owner: {
                    $first: "$owner"
                },
                isLiked: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$likes.likedBy"],
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                likesCount: 1,
                isLiked: 1,
                "videoFile.url": 1,
                createdAt: 1,
                owner: 1,
                createdAt: 1,
                duration: 1,
                comments: 1,
                views: 1
            }
        }
    ])

    await Video.findByIdAndUpdate(
        videoId,
        {
            $inc: {
                views: 1
            }
        }
    )

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $addToSet: {
                watchHistory: videoId
            }
        }
    )
    
    if (!video.length) {
        throw new ApiError(400, "Failed to fetch video")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, video[0], "Videos are fetched successfully"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title, description} = req.body
    const thumbnail  = req.file?.path
    //TODO: update video details like title, description, thumbnail
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Video id invalid")
    }

    if ([title, description].some((field) => field.trim() === "")) {
        throw new ApiError(400, "title and description required")
    }

    if (!thumbnail) {
        throw new ApiError(400, "thumbnail is missing")
    }

    const newThumbnail = await uploadOnCloudinary(thumbnail)

    if (!newThumbnail.url) {
        throw new ApiError(400, "thumbnail not found")
    }

    const video = await Video.findById(videoId)

    if (video?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only a owner can update a video")
    }

    
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: newThumbnail.url
            }
        },
        {
            new: true
        }
    )
    
    if (!updatedVideo) {
        throw new ApiError(400, "Something went wrong while updating video. please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const video = await Video.findById(videoId)
    
    if (video?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only a owner can delete a video")
    }

    const deleteVideo = await Video.findByIdAndDelete(video?._id)

    if (!deleteVideo) {
        throw new ApiError(400, "Failed to delete the video please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, { idDeleted: true}, "Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
