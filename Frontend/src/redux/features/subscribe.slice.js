import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isSubscribed: false,
    totalSubs: 0,
    error: null,
    loading: false
}
export const toggleSubscription = createAsyncThunk(
    "channel/toggleSubscription",

    async ({ channelId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")

            const res = await axios.post(
                `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data.data            
        } catch (error) {
            return rejectWithValue(error.response?.data || error)
        }
    }
)
export const fetchSubscriptionStatus = createAsyncThunk(
    "channel/subscription",

    async ({ channelId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token")

            const res = await axios.get(
                `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            return res.data.data            
        } catch (error) {
            return rejectWithValue(error.response?.data || error)
        }
    }
)

export const subscriptionSlice = createSlice({
    name: "subscriptionSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubscriptionStatus.pending, (state, action) => {
            state.loading = true
            state.error = null
        })

        .addCase(fetchSubscriptionStatus.fulfilled, (state, action) =>{
            const { isSubscribed, totalSubs } = action.payload

            state.isSubscribed = isSubscribed
            state.totalSubs = totalSubs
        })

        .addCase(fetchSubscriptionStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(toggleSubscription.pending, (state, action) => {
            state.loading = true
            state.error = null
        })

        .addCase(toggleSubscription.fulfilled, (state, action) =>{
            const { isSubscribed, totalSubs } = action.payload
            state.loading = false
            
            if (state.isSubscribed) {
                state.isSubscribed = false
                state.totalSubs -= 1
            } else{
                state.isSubscribed = true
                state.totalSubs += 1
            }
        })

        .addCase(toggleSubscription.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default subscriptionSlice.reducer