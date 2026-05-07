import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import VideoPlayer from './Pages/VideoPlayer'
import LikedVideos from './Pages/LikedVideos'
import History from './Pages/History'
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
        <Route path='/history' element={<History />}/>
      </Routes>
    </div>
  )
}

export default App