import {configureStore} from '@reduxjs/toolkit'
import likeReducer from './features/video.slice.js'
import  commentReducer  from './features/comment.slice.js'
import subscriptionReducer  from './features/subscribe.slice.js'

export const store = configureStore({
    reducer: {
        like: likeReducer,
        comment: commentReducer,
        subscription: subscriptionReducer
    }
})