import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Card = () => {
    const [video, setVideo] = useState(null)
    // const [token, setToken] = useState(null)
    const navigate = useNavigate()

    const fetchVideos = async () => {
        try {
            const token = localStorage.getItem("token")

            const res = await axios.get(
                "http://localhost:8000/api/v1/videos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setVideo(res.data.data)

        } catch (error) {
            console.error(error.response?.data || error.message)
        }
    }

    useEffect(()=>{
        fetchVideos()
    }, [])

    return (
        <div className="flex flex-wrap gap-6 m-2">
            {video?.docs?.map((e) => (
                <div
                    key={e._id}
                    className="w-90 rounded-2xl overflow-hidden hover:bg-[#ffffff20] transition duration-300 m-5"
                    onClick={() => navigate(`/video/${e._id}`)}
                >
                    <div className="w-full h-42 rounded-2xl">
                        <img
                            src={e.thumbnail}
                            className="w-full h-full object-cover rounded-2xl"
                            alt="Thumbnail"
                        />
                    </div>

                    <div className="flex gap-4 p-3">
                        <div className="w-10 h-10 shrink-0">
                            <img
                                src={e.ownerDetails?.avatar}
                                className="w-full h-full rounded-full object-cover"
                                alt="avatar"
                            />
                        </div>

                        <div className="flex flex-col overflow-hidden">
                            <h2 className="text-sm font-semibold line-clamp-2">
                                {e.title}
                            </h2>

                            <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                {e.description}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                {e.ownerDetails?.username}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card