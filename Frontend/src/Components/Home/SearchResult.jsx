import axios from 'axios';
import { Heading1 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SearchResult = ({ query }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(
                    `http://localhost:8000/api/v1/videos?query=${query}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(res.data);
                setVideos(res.data.data.docs);
            } catch (error) {
                console.error(
                    error.response?.data || error.message,
                );
            }
        };
        if (query) fetchVideos();
    }, [query]);

    return (
        <div className='h-full w-[85%] bg-black overflow-y-auto'>
            {videos.length === 0 ? (
                <p className='text-center mt-10'>
                    No results Found
                </p>
            ) : (
                videos.map((e) => {
                    return <div
                        key={e._id}
                        className='flex gap-4 text-start h-45 w-full my-3 mx-5 hover:bg-[#ffffff20] transition duration-300'
                    >
                        <div className='h-full w-[25%]'>
                            <img
                                src={e.thumbnail}
                                className='h-full w-full object-cover object-center rounded-2xl'
                                alt='thumbnail'
                            />
                        </div>
                        <div className='h-full w-[70%]'>
                            <p className='text-xl'>
                                {e.title}
                            </p>
                            <p className='my-2'>
                                {e.views} views •{' '}
                                {new Date(
                                    e.createdAt,
                                ).toDateString()}
                            </p>

                            <div className='w-10 h-10 shrink-0 my-3 flex gap-2 items-center font-light'>
                                <img
                                    src={
                                        e.ownerDetails
                                            ?.avatar
                                    }
                                    className='w-full h-full rounded-full object-cover'
                                    alt='avatar'
                                />
                                <p>
                                    {
                                        e.ownerDetails
                                            ?.username
                                    }
                                </p>
                            </div>
                            <h3 className='w-[70%]'>
                                {e.description?.slice(
                                    0,
                                    100,
                                )}
                                ...
                            </h3>
                        </div>
                    </div>;
                })
            )}
        </div>
    );
};

export default SearchResult;
