import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id);

        const totalLikes = await Like.countDocuments({ video: videoId });

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false, totalLikes }));
    }

    await Like.create({
        video: videoId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ video: videoId });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true, totalLikes }));
});

const getVideoLikeStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const likedAlready = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ video: videoId });

    return res.status(200).json(
        new ApiResponse(200, {
            isLiked: !!likedAlready,
            totalLikes,
        })
    );
});


const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const likedAlready = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id);

        const totalLikes = await Like.countDocuments({ comment: commentId });

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false, totalLikes }));
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ comment: commentId });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true, totalLikes }));
});

const getCommentLikeStatus = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    const likedAlready = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ comment: commentId });

    return res.status(200).json(
        new ApiResponse(200, {
            isLiked: !!likedAlready,
            totalLikes,
        })
    );
});


const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const likedAlready = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    if (likedAlready) {
        await Like.findByIdAndDelete(likedAlready._id);

        const totalLikes = await Like.countDocuments({ tweet: tweetId });

        return res
            .status(200)
            .json(new ApiResponse(200, { isLiked: false, totalLikes }));
    }

    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ tweet: tweetId });

    return res
        .status(200)
        .json(new ApiResponse(200, { isLiked: true, totalLikes }));
});

const getTweetLikeStatus = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const likedAlready = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user?._id,
    });

    const totalLikes = await Like.countDocuments({ tweet: tweetId });

    return res.status(200).json(
        new ApiResponse(200, {
            isLiked: !!likedAlready,
            totalLikes,
        })
    );
});


const getLikedVideos = asyncHandler(async (req, res) => {
    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(req.user?._id),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideos",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                        },
                    },
                    {
                        $unwind: "$ownerDetails",
                    },
                ],
            },
        },
        {
            $unwind: "$likedVideos",
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $project: {
                _id: 0,
                likedVideo: {
                    _id: "$likedVideos._id",
                    videoFile: "$likedVideos.videoFile",
                    thumbnail: "$likedVideos.thumbnail",
                    title: "$likedVideos.title",
                    description: "$likedVideos.description",
                    isPublished: "$likedVideos.isPublished",
                    createdAt: "$likedVideos.createdAt",
                    views: "$likedVideos.views",
                    duration: "$likedVideos.duration",
                    owner: "$likedVideos.owner",
                    ownerDetails: {
                        fullName: "$likedVideos.ownerDetails.fullName",
                        username: "$likedVideos.ownerDetails.username",
                        avatar: "$likedVideos.ownerDetails.avatar",
                    },
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
        );
});

export {
    toggleVideoLike,
    getVideoLikeStatus,
    toggleCommentLike,
    getCommentLikeStatus,
    toggleTweetLike,
    getTweetLikeStatus,
    getLikedVideos,
};