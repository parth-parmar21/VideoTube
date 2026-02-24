import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet    
    const { content } = req.body
    if (!content) {
        throw new ApiError(404, "Content not found")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user?._id
    })

    if (!tweet) {
        throw new ApiError(404, "Failed to create tweet, please try again")
    }
    console.log(tweet);
    
    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { content } = req.body
    const { tweetId } = req.params
    
    console.log("content", content);
    
    if (!content) {
        throw new ApiError(400, "Content not found")
    }
    console.log(content);
    
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet Id")
    }
    console.log(tweetId);

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new ApiError(400, "Tweet not found")
    }

    if (tweet?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only a owner can update a tweet")
    }

    const updateTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    )

    if (!updateTweet) {
        throw new ApiError(400, "Something went wrong while updating tweet")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updateTweet, "Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
