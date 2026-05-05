import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    v: {},
    c: {},
    t: {},
    loading: false,
    error: null
}

export const toggleLike = createAsyncThunk(
    "like/toggleLike",
    async ({ type, id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `http://localhost:8000/api/v1/likes/toggle/${type}/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            return {
                type,
                id,
                ...res.data.data
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
)
export const fetchLikeStatus = createAsyncThunk(
    "like/fetchLikeStatus",
    async ({ route, type, id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:8000/api/v1/${route}/${type}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            return {
                type,
                id,
                ...res.data.data
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
)

export const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleLike.pending, (state) => {
                state.loading = true
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.loading = false

                const { type, id, isLiked, totalLikes } = action.payload

                state[type][id] = {
                    liked: isLiked,
                    likeCount: totalLikes
                }
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchLikeStatus.fulfilled, (state, action) => {
                console.log(action.payload);
                const { type, id, isLiked, totalLikes } = action.payload
                
                state[type][id] = {
                    liked: isLiked,
                    likeCount: totalLikes
                }
            })
    }
})

export default likeSlice.reducer