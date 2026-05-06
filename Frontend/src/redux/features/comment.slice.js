    import axios from 'axios'
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

    const initialState = {
        comments: [],
        loading: false,
        error: null
    }

    export const fetchComments = createAsyncThunk(
        "comment/fetchComments",
        async ({ videoId }, { rejectWithValue }) => {
            try {
                const token = localStorage.getItem("token")

                const res = await axios.get(
                    `http://localhost:8000/api/v1/comments/${videoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data.data.docs
            } catch (error) {
                return rejectWithValue(error.response?.data || error)

            }
        }
    )

    export const addComment = createAsyncThunk(
        "comment/addComment",
        async ({ videoId, content }, { rejectWithValue }) => {
            try {
                const token = localStorage.getItem("token")

                const res = await axios.get(
                    `http://localhost:8000/api/v1/comments/${videoId}`,
                    {
                        content
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                return res.data.data
            } catch (error) {
                return rejectWithValue(error.Response?.data || error)

            }
        }
    )

    export const commentSlice = createSlice({
        name: "comment",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.unshift(action.payload)
            })
        }
    })

    export default commentSlice.reducer