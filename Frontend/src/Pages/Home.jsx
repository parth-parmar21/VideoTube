import React, { useState } from 'react'
import SideBar from '../Components/Home/SideBar'
import SearchBar from '../Components/Home/SearchBar'
import MainGrid from '../Components/Home/MainGrid'
import SearchResult from '../Components/Home/SearchResult'

const Home = () => {
    const [query, setQuery] = useState("")

    return (
        <div className='min-h-screen text-white'>
            <SearchBar setQuery={setQuery} />
            <div className='flex h-screen w-full'>
                <SideBar />

                {
                    query.trim() === "" ?
                    <MainGrid />
                    : <SearchResult query={query}/>
                }
            </div>
        </div>
    )
}

export default Home