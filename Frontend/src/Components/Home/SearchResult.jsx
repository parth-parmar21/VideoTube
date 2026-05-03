import axios from 'axios';
import { Heading1 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SearchResult = ({ query }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    query
                        ? `http://localhost:8000/api/v1/videos?query=${query}`
                        : `http://localhost:8000/api/v1/videos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                setVideos(res.data.data.docs || []);
            } catch (error) {
                console.error(
                    error.response?.data || error.message,
                );
            }
            finally{
                setLoading(false);
            }
        };
        fetchVideos();
    }, [query]);

    if (loading) {
        return (
            <p className='text-center mt-10'>
                Loading...
            </p>
        );
    }

    if (videos.length === 0) {
        return (
            <p className='text-center mt-10'>
                {query
                    ? 'No results Found'
                    : 'No videos available'}
            </p>
        );
    }
    const isSearch = query && query.trim() !== ""
    return (
        <div className='h-full w-full bg-black overflow-y-auto'>
            {videos.map((e) => {
                return (
                    <div
                        key={e._id}
                        className={`flex gap-4 text-start h-45 w-full ${!isSearch? 'my-0 mx-0': 'my-3 mx-5'} hover:bg-[#ffffff20] transition duration-300`}
                    >
                        <div className={`${isSearch ? "h-full w-[25%]" : "h-full w-full"}`}>
                            <img
                                src={e.thumbnail}
                                className='h-full w-full object-cover object-center rounded-2xl'
                                alt='thumbnail'
                            />
                        </div>
                        <div className='h-full w-[70%]'>
                            <p className={`${isSearch ? 'text-xl': 'text-lg'}`}>
                                {e.title}
                            </p>
                            <p className={`${isSearch ? 'my-2': 'my-0 font-light'}`}>
                                {e.views} views •{' '}
                                {new Date(
                                    e.createdAt,
                                ).toDateString()}
                            </p>

                            <div className={`${isSearch ? 'w-10 h-10' : 'w-0 h-0'} my-3 shrink-0 flex gap-2 items-center font-light`}>
                                <img
                                    src={
                                        e.ownerDetails
                                            ?.avatar
                                    }
                                    className={`w-full h-full rounded-full object-cover ${isSearch? 'block': 'hidden'}`}
                                    alt='avatar'
                                />
                                <p>
                                    {
                                        e.ownerDetails
                                            ?.username
                                    }
                                </p>
                            </div>
                            <h3 className={`${isSearch? 'block': 'hidden'} w-[70%]`}>
                                {e.description?.slice(
                                    0,
                                    100,
                                )}
                                ...
                            </h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResult;
