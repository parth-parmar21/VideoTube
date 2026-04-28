import React from 'react'
import { Folder, History, House, HousePlug, Info, Settings, ThumbsUp, UserCheck, Video, VideoIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const SideBarButtonsTop = () => {
    const navigate = useNavigate()
    const btnsTypesTop = [
        {
            "name": "Home",
            "icon": <House />,
            "route": "/home"
        },
        {
            "name": "Liked videos",
            "icon": <ThumbsUp />,
            "route": "/likes/videos"
        },
        {
            "name": "History",
            "icon": <History />,
            "route": "/history"
        },
        {
            "name": "my content",
            "icon": <VideoIcon />,
            "route": "/my-content"
        },
        {
            "name": "collection",
            "icon": <Folder />,
            "route": "/collection"
        },
        {
            "name": "subscribers",
            "icon": <UserCheck />,
            "route": "/subscribers"
        },
    ]


    return (
        btnsTypesTop.map((e) => {
            return <div key={e.name}>
                <button className='border-white border flex gap-5 items-center px-2 w-full h-10 my-1'
                    onClick={() => navigate(e.route)}
                >
                    {e.icon}
                    {e.name}
                </button>
            </div>
        }
        )
    )
}

export default SideBarButtonsTop