import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CommentSection = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `http://localhost:8000/api/v1/comments/${videoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setComments(res.data.data.docs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (videoId) fetchComments();
    }, [videoId]);

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:8000/api/v1/comments/${videoId}`,
                {
                    content: comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
    
            const newComment = res.data.data
            setComments((prev) => [newComment, ...prev])
    
            setComment('')
        } catch (error) {
            console.error(error);
            
        }
    };

    if (loading) return <p>Loading Comments...</p>;

    return (
        <div className='bg-black border p-3 rounded-xl '>
            <h3 className='mb-3 font-semibold'>Comments</h3>

            <input
                type='text'
                placeholder='Add comments'
                className='w-full outline-none border p-2 rounded-lg'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                onKeyDown={(e) =>{
                    if (e.key === "Enter") {
                        handleAddComment()
                    }
                }}
            />
            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((c) => {
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
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CommentSection;
