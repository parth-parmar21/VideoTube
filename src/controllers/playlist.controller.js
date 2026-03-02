import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from '../models/video.model.js'

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    //TODO: create playlist
    
    if (!name || !description) {
        throw new ApiError(400, "name and description both are required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user?._id,
    });

    if (!playlist) {
        throw new ApiError(500, "failed to create playlist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, playlist, "playlist created successfully"));
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "invalid playlist id");
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid video id");
    }

    const playlist = await Playlist.findById(playlistId)
    const video = await Video.findById(videoId)

    if (!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    if (!video) {
        throw new ApiError(400, "Video not found")
    }

    const addToPlaylist = await Playlist.findOneAndUpdate(
        {
            _id: playlist?._id,
            owner: req.user?._id
        },
        {
            $addToSet: {
                video: videoId
            }
        },
        {
            new: true
        }
    )

    if (!addToPlaylist) {
        throw new ApiError(400, "Failed to add video to playlist")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, addToPlaylist, "Video add to playlist successfully"))

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid PlaylistId or videoId");
    }


    const playlist = await Playlist.findById(playlistId)
    const video = await Video.findById(videoId)

    if (!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    if (!video) {
        throw new ApiError(400, "Video not found")
    }    

    await Playlist.findOneAndDelete(
        {
            _id: playlistId,
            owner: req.user?._id
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200, {isVideoRemoved: true}, "Video removed from playlist successfully"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Playlist id not found")
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    const deletedPlaylist = await Playlist.findOneAndDelete(
        {
            _id: playlistId,
            owner: req.user?._id
        }
    )

    if (!deletePlaylist) {
        throw new ApiError(400, "failed to delete playlist")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {isDeleted: true}, "Playlist deleted successfully"))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Playlist id not found")
    }

    if (!name || !description) {
        throw new ApiError(400, "name and description both are required");
    }

    const playlist = await Playlist.findById(playlistId)

    if (!playlist) {
        throw new ApiError(400, "Playlist not found")
    }

    const updatedPlaylist = await Playlist.findOneAndUpdate(
    {
        _id: playlistId,
        owner: req.user?._id
    },
    {
        $set: {
            name,
            description
        }
    },
    {
        new: true
    }
)

    if (!updatePlaylist) {
        throw new ApiError(400, "failed to updated playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
