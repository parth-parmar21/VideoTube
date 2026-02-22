import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if (!isValidObjectId(channelId)) {
        throw new ApiError(402, "channelId not found")
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    })

    if (isSubscribed) {
        const Unsubscribed = await Subscription.findByIdAndDelete(isSubscribed?._id)

        return res
        .status(200)
        .json(new ApiResponse(200, Unsubscribed, "Unsubscribed successfully"))
    }

    const subscribed = await Subscription.create({
        subscriber: req.user._id,
        channel: channelId
    })

    return res
    .status(200)
    .json(new ApiResponse(200, subscribed, "Subscribed successfully"))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(403, "ChannelId not found")
    }
    channelId = new mongoose.Types.ObjectId(channelId)

    const subscribers = Subscription.aggregate([
        {
            $match: channelId
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriber",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscription",
                            localField: "_id",
                            foreignField: "channel",
                            as: "toSubscribed"
                        }
                    },
                    {
                        $addFields: {
                            toSubscribed: {
                                $cond: {
                                    $if: {
                                        $in: [
                                            channelId,
                                            "$toSubscribed.subscriber"
                                        ],
                                        then: true,
                                        else: false
                                    }
                                },
                                subscriberCount: {
                                    $size: "$toSubscribed"
                                }
                            }
                        }
                    }
                ],
            }
        },
        {
            $unwind: "$subscriber"
        },
        {
            $project: {
                _id: 0,
                subscriber: {
                    username: 1,
                    fullName: 1,
                    "avatar.url": 1,
                    toSubscribed: 1,
                    subscriberCount: 1
                }
            }
        }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, subscribers, "subscribers fetched successfully"))

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!subscriberId) {
        throw new ApiError(403, "SubscriberId not found")
    }

    const subscribedChannels = await Subscription.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "toSubscribe",
                pipeline: [
                    {
                        $lookup: {
                            from: "videos",
                            localField: "_id",
                            foreignField: "owner",
                            as: "creator",
                        }
                    },
                    {
                        $addFields: {
                            $last: "$creators"
                        }
                    }
                ],
            },
        },
        {
            $unwind: "$toSubscribe"
        },
        {
            $project: {
                _id: 0,
                subscribedChannels: {
                    _id: 0,
                    fullName: 1,
                    username: 1,
                    "avatar.url": 1,
                    latestVideo: {
                        _id: 1,
                        "videoFile.url": 1,
                        "thumbnail.url": 1,
                        owner: 1,
                        title: 1,
                        description: 1,
                        duration: 1,
                        createdAt: 1,
                        views: 1
                    }
                }
            }
        }
    ])

    Subscription.findByIdAndDelete()
    return res
    .status(200)
        .json(new ApiResponse(200, subscribedChannels, "subscribed channels fetched successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}