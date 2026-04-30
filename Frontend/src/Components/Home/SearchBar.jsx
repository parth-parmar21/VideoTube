import React from 'react';
import Logo from '../../assets/cube-white.png';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setQuery }) => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-between items-center h-20 bg-black w-full border-b  px-5'>
            <div>
                <img className='h-15' src={Logo} alt='' />
            </div>
            <div className='relative w-100'>
                <Search
                    size={18}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-white'
                />

                <input
                    type='text'
                    placeholder='Search'
                    className='w-full h-10 pl-10 pr-4 border border-white bg-black text-white rounded outline-none placeholder:text-white'
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />
            </div>

            <div className='flex gap-5'>
                <button
                    className='py-2 px-5 bg-[#ffffff1e] hover:bg-purple-800'
                    onClick={() => navigate('/login')}
                >
                    Log in
                </button>
                <button
                    className='py-2 px-5 bg-[#ffffff1e] hover:bg-purple-800'
                    onClick={() => navigate('/signup')}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
