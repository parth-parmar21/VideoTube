import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/Home/SearchBar'
import SideBar from '../Components/Home/SideBar'
import SearchResult from '../Components/Home/SearchResult'
import Video from '../Components/VideoPlayer/Video'
import Description from '../Components/VideoPlayer/Description'
import CommentSection from '../Components/VideoPlayer/CommentSection'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const VideoPlayer = () => {
    const {videoId} = useParams()
    const [video, setVideo] = useState(null)

    const fetchVideos = async() => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(
                `http://localhost:8000/api/v1/videos/${videoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )            
            setVideo(res.data.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() =>{
        fetchVideos()
    }, [videoId])

    if(!video) return <p>Loading...</p>
    console.log(video);

    return (
        <div className='min-h-screen w-full bg-black text-white'>
            <SearchBar />

            <div className='flex w-full'>
                <SideBar forcedCollpased={true} />

                <div className="flex gap-3 flex-1 p-3">

                    <div className='w-[70%] flex flex-col gap-4'>

                        <Video className="w-full aspect-video" videoUrl={video.videoFile}/>

                        <Description desc={video.description}/>

                        <CommentSection videoId={video._id}/>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='w-[30%] max-h-screen overflow-y-auto'>
                        <SearchResult />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VideoPlayer