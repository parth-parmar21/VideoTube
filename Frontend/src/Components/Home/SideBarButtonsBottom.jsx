import { Info, Settings } from 'lucide-react'
import React from 'react'
import {useNavigate} from 'react-router-dom'
const SideBarButtonsBottom = () => {
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
                <button className='border-white border flex gap-5 items-center px-2 w-full h-10 my-1 '
                    onClick={()=> navigate(e.route)}
                >
                    {e.icon}
                    {e.name}
                </button>
            </div>
        })
    )
}

export default SideBarButtonsBottom