import mongoose, { get, isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Video id not found")
    }

    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(400, "Video not found")
    }

    const getComments = Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
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
                            $in: [ req.user?._id, "$likes.likedBy" ]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                content: 1,
                createdAt: 1,
                likesCount: 1,
                owner: {
                    username: 1,
                    fullName: 1,
                    avatar: 1
                },
                isLiked: 1
            }
        }
    ])

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    }

    const comments = await Comment.aggregatePaginate(getComments, options)
    
    return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params
    const { content } = req.body

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Video id not found")
    }

    if (!content) {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.create({
        video: videoId,
        content,
        owner: req.user?._id
    })

    const popluateComment = await Comment.findById(comment._id)
    .populate({
        path: "owner",
        select: "username avatar "
    })
    
    return res
    .status(200)
    .json(new ApiResponse(200, popluateComment, "Comment created successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params
    const { content } = req.body
    
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Video id not found")
    }

    if (!content) {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(400, "Does not found comment")
    }    

    const updateComment = await Comment.findOneAndUpdate(
        {
            _id: commentId,
            owner: new mongoose.Types.ObjectId(req.user._id) // type miss match
        },
        {
            $set: {
                content
            }
        },
        {
            new: true,
        }
    );
    const comments = await Comment.findById(commentId);
    
    if (!updateComment) {
        throw new ApiError(400, "only owner can update comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updateComment, "comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Comment id not found")
    }

    // const comment = await Comment.findById(commentId)

    // if (!comment) {
    //     throw new ApiError(400, "Comment not found")
    // }

    const deletedComment = await Comment.findOneAndDelete(
        {
            _id: commentId,
            owner: req.user?._id
        }
    )

    if (!deletedComment) {
        throw new ApiError(404, "Comment not found or unauthorized");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {isDeleted: true}, "comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }
