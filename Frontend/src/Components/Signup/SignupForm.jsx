import React, { useEffect, useState } from 'react';
import github from '../../assets/icon-github.svg';
import google from '../../assets/icon-google.svg';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react'
import axios from 'axios'
const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        avatar: null,
        coverImage: null
    })

    const goLogIn = () => {
        navigate('/login');
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("fullName", formData.fullName);
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("avatar", formData.avatar);
        data.append("coverImage", formData.coverImage);

        try {
            await axios.post("http://localhost:8000/api/v1/users/register",
                data
            )
            navigate("/login")
        } catch (error) {
            console.error(error.response?.data || err.message);

        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        })
    }

    return (
        <form
            onSubmit={(e) => {
                formSubmit(e);
            }}
            className='h-full py-5 px-15'
        >
            <div className='text-center'>
                <h2 className='capitalize font-medium text-2xl'>
                    sign up account
                </h2>
                <p className='text-(--txt-light) py-1'>
                    Enter your credential to create account
                </p>
            </div>

            {/* <div className='flex gap-3 justify-center w-full py-8'>
                <button
                    type='button'
                    className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center'
                >
                    <img src={google} alt='google' />
                    Google
                </button>
                <button
                    type='button'
                    className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center'
                >
                    <img src={github} alt='github' />
                    Github
                </button>
            </div> */}
            <div className='flex flex-col items-center py-2'>
                <div className='h-20 w-20 rounded-full m-2 border-2 flex items-center justify-center overflow-hidden'>
                    <label htmlFor='avatarUpload' className='cursor-pointer w-full h-full'>
                        <img
                            className='w-full h-full object-cover'
                            src={
                                formData.avatar
                                    ? URL.createObjectURL(formData.avatar)
                                    : "https://i.pinimg.com/736x/dc/11/98/dc11982566b262d0e7cc3c2e80551703.jpg"
                            } alt="" />
                    </label>

                    <input
                        id="avatarUpload"
                        type="file"
                        accept="image/*"
                        name="avatar"
                        hidden
                        onChange={handleChange}
                    />
                </div>
                <div className='h-20 w-full bg-(--bg-dark) rounded-2xl m-2'>
                    <label htmlFor="coverUpload" className='cursor-pointer w-full h-full'>
                        <img 
                            className='w-full h-full object-cover rounded-2xl bg-[#ffffff1e]'
                        src={
                            formData.coverImage
                                ? URL.createObjectURL(formData.coverImage)
                                : "https://dummyimage.com/400x100/1a1a1a/1a1a1a"
                        }
                            alt=''
                        />
                    </label>
                    <input
                        type='file'
                        id='coverUpload'
                        accept='image/*'
                        name='coverImage'
                        hidden
                        onChange={handleChange}
                    />
                </div>
            </div>
            {/* <div className='flex items-center mx-auto w-[80%] gap-3 pb-4'>
                <div className='flex-1 h-px bg-[#ffffff1e]'></div>
                <span className='text-white text-sm'>
                    Or
                </span>
                <div className='flex-1 h-px bg-[#ffffff1e]'></div>
            </div> */}

            <div className='flex mx-auto gap-2'>
                <div>
                    <label>User Name</label>
                    <input
                        type='text'
                        name='username'
                        className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-[95%]'
                        placeholder='eg. Jhon'
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <p className='text-sm pt-2 text-red-500 hidden'>
                        username not available
                    </p>
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type='text'
                        name='fullName'
                        className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-[95%]'
                        placeholder='eg. Jhon Francisco'
                        onChange={handleChange}
                        value={formData.fullName}
                    />
                </div>
            </div>

            <div className='py-4'>
                <label className='block'>Email</label>
                <input
                    type='email'
                    name='email'
                    className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-full'
                    placeholder='eg. jhonfrancisco@gmail.com'
                    onChange={handleChange}
                    value={formData.email}
                />
            </div>

            <div>
                <label className='block'>Password</label>
                <input
                    type='password'
                    name='password'
                    className='bg-(--bg-dark) rounded-lg py-2 px-3 my-2 w-full'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    value={formData.password}
                />
                <p className='text-sm py-2 text-red-500 hidden'>
                    Must be atleast 8 characters.
                </p>
            </div>
            <button className='w-full bg-white text-black py-2 my-4 rounded-lg'>
                Sign Up
            </button>

            <h2 className='text-center text-[#ffffff8e]'>
                Already have an Account?{' '}
                <span
                    className='text-white hover:border-b cursor-pointer'
                    onClick={goLogIn}
                >
                    Log In
                </span>
            </h2>
        </form>
    );
};

export default SignupForm;
