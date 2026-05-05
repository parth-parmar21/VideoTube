import {configureStore} from '@reduxjs/toolkit'
import likeReducer from './features/video.slice.js'

export const store = configureStore({
    reducer: {
        like: likeReducer
    }
})