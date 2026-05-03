import React from 'react'
import { Folder, History, House, HousePlug, Info, Menu, Settings, ThumbsUp, UserCheck, Video, VideoIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const SideBarButtonsTop = ({ isCollapsed }) => {
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
                <button
                    className={`border-white border flex items-center w-full h-10 my-1 
    ${isCollapsed ? 'justify-center' : 'gap-5 px-2'}`}
                    onClick={() => navigate(e.route)}
                >
                    {e.icon}
                    {!isCollapsed && e.name}
                </button>
            </div>
        }
        )
    )
}

export default SideBarButtonsTop