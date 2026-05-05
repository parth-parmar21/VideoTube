import axios from 'axios';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikeStatus, toggleLike } from '../../redux/features/video.slice.js';
import { useParams } from 'react-router-dom';
import { addComment, fetchComments } from '../../redux/features/comment.slice.js';

const CommentSection = ({ videoId }) => {
    const [comment , setComment] = useState('');
    const dispatch = useDispatch()

    const { comments, loading} = useSelector((state) => state.comment)
    const likeData = useSelector((state) => state.like.c);

    useEffect(() => {
        if(videoId) dispatch(fetchComments({ videoId }))
    }, [videoId, dispatch])

    useEffect(() => {
        comments.forEach((c) => {
            dispatch(fetchLikeStatus({route: "likes", type: "c", id: c._id }));
        });
    }, [comments, dispatch]);

    

    const handleAddComment = async () => {
        if (!comment.trim()) return;
            dispatch(addComment({ videoId, content: comment}))
            setComment('');
        
    };

    if (loading) return <p>Loading Comments...</p>;

    return (
        <div className='bg-black border p-6 rounded-xl '>
            <h3 className='mb-3 font-semibold text-xl'>
                Comments
            </h3>

            <input
                type='text'
                placeholder='Add comments'
                className='w-full outline-none border p-2 rounded-lg'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAddComment();
                    }
                }}
            />
            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((c) => {
                    const liked = likeData?.[c._id]?.liked ?? false;
                    const likeCount = likeData?.[c._id]?.likeCount ?? 0;

                    return (
                        <div
                            key={c._id}
                            className='flex border-t-2 h-24 my-5 p-4 gap-4'
                        >
                            <div className='h-10 w-10 '>
                                <img
                                    src={c.owner?.avatar}
                                    className='w-full h-full object-cover rounded-4xl'
                                    alt='avatar'
                                />
                            </div>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <p>
                                        {c.owner?.fullName}
                                    </p>
                                    <p className='font-light text-sm tracking-wider'>
                                        {new Date(
                                            c.createdAt,
                                        ).toDateString()}
                                    </p>
                                </div>
                                <p className='font-light'>
                                    {c.owner?.username}
                                </p>
                                <p className='font-light mt-4'>
                                    {c.content}
                                </p>
                            </div>
                            <div className='flex  flex-col items-center ml-auto'>
                                <Heart
                                    className={`cursor-pointer ${liked ? "text-red-500" : "text-white"
                                        }`}
                                    fill={liked ? "red" : "none"}
                                    onClick={() => {
                                        dispatch(toggleLike({ type: "c", id: c._id }));
                                    }}
                                />
                                <p>{likeCount}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CommentSection;
