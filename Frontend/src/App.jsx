import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import VideoPlayer from './Pages/VideoPlayer'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" index element={<Signup />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/video-player' element={<VideoPlayer />}/>
      </Routes>
    </div>
  )
}

export default App