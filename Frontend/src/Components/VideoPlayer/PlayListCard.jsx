import { Cross, X } from 'lucide-react';
import React from 'react';

const PlayListCard = ({ onClose }) => {
    return (
        <div className='fixed inset-0 bg-[#ffffff31] bg-opacity-50 flex justify-center items-center'
            onClick={onclose}
        >
            <div
                className='flex flex-col justify-between bg-black text-white p-5 rounded-xl min-h-90 w-70'
                onClick={(e) => e.stopPropagation()}
            >
                <div className=''>
                    <div 
                    className='flex w-full'
                    >
                        <h2 className='text-xl font-semibold mx-auto'>
                            Save To Playlist
                        </h2>
                        <button onClick={onClose}>
                            <X />
                        </button>
                    </div>

                    <div className="my-3 w-full flex items-center justify-center">
                        <div className="flex flex-col items-start">

                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Best mode</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Melody</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Motivation</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                <span>Self improvement</span>
                            </label>

                        </div>
                    </div>
                </div>

                <div 
                className='flex flex-col items-center'>
                    <h2>Playlist name</h2>
                    <input
                        type='text'
                        placeholder='Enter playlist name'
                        className='w-full border p-2 bg-white placeholder:text-black text-black rounded-lg my-2 outline-none'
                    />
                    <button
                    className='bg-purple-800 p-2 rounded-lg mt-3 font-semibold'
                    >Create new playlist</button>
                </div>
            </div>
        </div>
    );
};

export default PlayListCard;
