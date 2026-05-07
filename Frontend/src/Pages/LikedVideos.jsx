    import React, { useEffect, useState } from 'react'
    import SideBar from '../Components/Home/SideBar'
    import { useNavigate } from 'react-router-dom'
    import Card from '../Components/Home/CArd'
    import axios from 'axios'

    const LikedVideos = () => {
        const [video, setVideo] = useState([])
        const navigate = useNavigate()

        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await axios.get(
                    "http://localhost:8000/api/v1/likes/videos",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setVideo(res.data)

            } catch (error) {
                console.error(error.response?.data || error.message)
            }
        }

        useEffect(() => {
            fetchVideos()
        }, [])

        return (
            <div
            className='flex bg-black h-screen w-full text-white'
            >
                <SideBar />

                <div>
                    <div className="flex flex-wrap m-2">
                        {video?.data?.map((e) => (
                            <div
                                key={e.likedVideo._id}
                                className="w-90 rounded-2xl overflow-hidden hover:bg-[#ffffff20] transition duration-300 m-5"
                                onClick={() => navigate(`/video/${e.likedVideo._id}`)}
                            >
                                <div className="w-full h-42 rounded-2xl">
                                    <img
                                        src={e.likedVideo.thumbnail}
                                        className="w-full h-full object-cover rounded-2xl"
                                        alt="Thumbnail"
                                    />
                                </div>

                                <div className="flex gap-4 p-3">
                                    <div className="w-10 h-10 shrink-0">
                                        <img
                                            src={e.likedVideo.ownerDetails?.avatar}
                                            className="w-full h-full rounded-full object-cover"
                                            alt="avatar"
                                        />
                                    </div>

                                    <div className="flex flex-col overflow-hidden">
                                        <h2 className="text-sm font-semibold line-clamp-2">
                                            {e.likedVideo.title}
                                        </h2>

                                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                            {e.likedVideo.description}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {e.likedVideo.ownerDetails?.username}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    export default LikedVideos