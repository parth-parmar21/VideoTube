import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query


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
    
    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment created successfully"))
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
    console.log("Comment Owner:", comments.owner);
    console.log(updateComment);
    
    if (!updateComment) {
        throw new ApiError(400, "only owner can update comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updateComment, "comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
