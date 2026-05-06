import axios from 'axios';
import {
    FolderPlus,
    ThumbsDown,
    ThumbsUp,
    UserRoundCheck,
    UserRoundPlus,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import PlayListCard from './PlayListCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchLikeStatus,
    toggleLike,
} from '../../redux/features/video.slice';
import {
    fetchSubscriptionStatus,
    toggleSubscription,
} from '../../redux/features/subscribe.slice';

const ChannelDetails = ({ videoId, channelId }) => {

    const [disLike, setDisLike] = useState(false);
    const [video, setVideo] = useState(null);
    const [showPlaylist, setShowPlaylist] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchLikeStatus({ type: 'v', id: videoId }),
        );
    }, [videoId, dispatch]);

    const likeData = useSelector(
        (state) => state.like.v?.[videoId],
    );

    const liked = likeData?.liked ?? false;
    const likeCount = likeData?.likeCount ?? 0;

    const { isSubscribed, totalSubs } = useSelector(
        (state) => state.subscription,
    );

    useEffect(() => {
        if (channelId)
            dispatch(
                fetchSubscriptionStatus({ channelId }),
            );
    }, [channelId, dispatch]);

    return (
        <div className='h-46 text-white w-full border-b'>
            <div className='flex justify-between items-start'>
                <div>
                    <h3 className=''>
                        Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Dicta
                        iure exercitationem rem?
                    </h3>
                    <p className='py-1 tracking-wide'>
                        Total views • Time
                    </p>
                </div>

                <div className='flex gap-5'>
                    <div className='flex py-1 border rounded-xl'>
                        <button
                            className={`py-2 px-4 flex gap-2 items-center`}
                            onClick={() => {
                                dispatch(
                                    toggleLike({
                                        type: 'v',
                                        id: videoId,
                                    }),
                                );
                            }}
                        >
                            <ThumbsUp
                                className={`${liked ? 'text-purple-800' : 'text-white'}`}
                            />
                            <span className='font-semibold'>
                                {likeCount}
                            </span>
                        </button>

                        <button
                            className='py-2 px-4'
                            onClick={() => {
                                disLike
                                    ? setDisLike(false)
                                    : setDisLike(true);
                            }}
                        >
                            <ThumbsDown
                                className={`${disLike ? 'text-purple-800' : 'text-white'}`}
                            />
                        </button>
                    </div>
                    <button className='flex items-center gap-2 px-4 bg-white text-black border rounded-xl'
                    onClick={() => setShowPlaylist(true)}
                    >
                        <FolderPlus strokeWidth={1.5} />
                        <span className='font-semibold'>
                            Save
                        </span>
                    </button>
                </div>
            </div>

            <div className='flex justify-between items-center my-2'>
                <div className='flex gap-4'>
                    <div>
                        <img
                            src='http://res.cloudinary.com/parthparmar/image/upload/v1777483203/yf7qzsjyhsrsz5lupqoy.jpg'
                            className='h-10 w-10 object-cover rounded-4xl'
                            alt='avatar'
                        />
                    </div>
                    <div>
                        <h2>Full name</h2>
                        <p>{totalSubs} subscriber</p>
                    </div>
                </div>
                <div>
                    <button
                        className={`flex gap-2 border py-2 px-4 font-semibold 
                            ${isSubscribed
                                ? 'bg-purple-800 border-purple-800 text-white'
                                : 'hover:bg-purple-800 hover:border-purple-800'
                            }`}
                        onClick={() => {
                            dispatch(
                                toggleSubscription({
                                    channelId,
                                }),
                            );
                        }}
                    >
                        {isSubscribed ? (
                            <UserRoundCheck />
                        ) : (
                            <UserRoundPlus />
                        )}
                        <span>
                            {isSubscribed
                                ? 'Subscribed'
                                : 'Subscribe'}
                        </span>
                    </button>
                </div>
            </div>
            {showPlaylist && (
                <PlayListCard onClose={() => setShowPlaylist(false)} />
            )}
        </div>
    );
};

export default ChannelDetails;
