import React from 'react'
import SideBar from '../Components/Home/SideBar'
import SearchBar from '../Components/Home/SearchBar'
import MainGrid from '../Components/Home/MainGrid'

const Home = () => {
    return (
        <div className='h-screen text-white overflow-hidden'>
            <SearchBar />
            <div className='flex h-screen w-full'>
                <SideBar />
                <MainGrid />
            </div>
        </div>
    )
}

export default Home