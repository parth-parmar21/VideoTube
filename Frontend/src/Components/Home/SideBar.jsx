import React from 'react'
import SideBarButtonsBottom from './SideBarButtonsBottom'
import SideBarButtonsTop from './SideBarButtonsTop'

const SideBar = () => {
    return (
        <div
        className='h-[90vh] w-[15%] bg-black text-white flex flex-col justify-between py-5 px-3 border-r'
        >
            <div><SideBarButtonsTop /></div>
            <div><SideBarButtonsBottom /></div>
        </div>
    )
}

export default SideBar