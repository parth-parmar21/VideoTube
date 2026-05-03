import React from 'react'
import SearchBar from '../Components/Home/SearchBar'
import SideBar from '../Components/Home/SideBar'
import SearchResult from '../Components/Home/SearchResult'
import Video from '../Components/VideoPlayer/Video'
import Description from '../Components/VideoPlayer/Description'
import CommentSection from '../Components/VideoPlayer/CommentSection'
const VideoPlayer = () => {
    return (
        <div className='min-h-screen w-full bg-black text-white'>
            <SearchBar />

            <div className='flex w-full'>
                <SideBar forcedCollpased={true} />

                <div className="flex gap-3 flex-1 p-3">

                    <div className='w-[70%] flex flex-col gap-4'>

                        <Video className="w-full aspect-video" />

                        <Description />

                        <CommentSection />

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