import { Cross, X } from 'lucide-react';
import React from 'react';

const PlayListCard = ({ onClose }) => {
    return (
        <div className='fixed inset-0 bg-[#ffffff31] bg-opacity-50 flex justify-center items-center'>
            <div
                className='bg-black text-white p-5 rounded-xl min-h-90 w-70'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-start justify-between'>
                    <h2 className='text-xl font-semibold mx-auto'>
                        Save To Playlist
                    </h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className='flex justify-center items-center'>
                    <input type='checkbox' name='' id='' />
                    <h2>Test</h2>
                </div>
                <div className='flex flex-col items-center'>
                    <h2>Playlist name</h2>
                    <input
                        type='text'
                        placeholder='Enter playlist name'
                        className='w-[90%] border py-2'
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayListCard;
