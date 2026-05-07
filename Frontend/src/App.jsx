import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import VideoPlayer from './Pages/VideoPlayer'
import LikedVideos from './Pages/LikedVideos'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" index element={<Signup />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/video/:videoId' element={<VideoPlayer />}/>
        <Route path='/likes/videos' element={<LikedVideos />} />
      </Routes>
    </div>
  )
}

export default App