import React from 'react'
import SearchBar from '../Components/Home/SearchBar'
import SideBar from '../Components/Home/SideBar'
import SearchResult from '../Components/Home/SearchResult'
const VideoPlayer = () => {
    return (
        <div className='min-h-screen w-full bg-black text-white '>
            <SearchBar />
            <div className='flex h-screen w-full'>
                <SideBar />
                <div className="flex gap-3 flex-1 p-3">
                    <div className='h-full w-[70%] bg-red-800'></div>
                    <div className='h-full w-[30%] bg-yellow-800'>
                        <SearchResult />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer