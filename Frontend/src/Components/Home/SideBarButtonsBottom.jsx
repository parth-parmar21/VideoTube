import { Info, Settings } from 'lucide-react'
import React from 'react'
import {useNavigate} from 'react-router-dom'
const SideBarButtonsBottom = ({ isCollapsed }) => {
    const navigate = useNavigate()
    const btnsTypesBottom = [{
        "name": "support",
        "icon": <Info />,
        "route": "/support"
    },
    {
        "name": "settings",
        "icon": <Settings />,
        "route": "/settings"
    },]

    return (
        btnsTypesBottom.map((e) => {
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
        })
    )
}

export default SideBarButtonsBottom