import React from 'react'
import github from '../../assets/icon-github.svg'
import google from '../../assets/icon-google.svg'
import {useNavigate} from 'react-router-dom'
const SignupForm = () => {
    const navigate = useNavigate()

    const goLogIn = () => {
        navigate("/login")
    } 
    return (
        <form className='h-full py-10 px-15'>
            <div className='text-center'>
                <h2 className='capitalize font-medium text-2xl'>
                    sign up account
                </h2>
                <p className='text-(--txt-light) py-1'>
                    Enter your credential to create account
                </p>
            </div>

            <div className='flex gap-3 justify-center w-full py-8'>
                <button
                    type='button'
                    className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center'
                >
                    <img src={google} alt="google" />
                    Google
                </button>
                <button
                    type='button'
                    className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center'
                >
                    <img src={github} alt="github" />
                    Github
                </button>
            </div>

            <div className="flex items-center mx-auto w-[80%] gap-3 pb-4">
                <div className="flex-1 h-px bg-[#ffffff1e]"></div>
                <span className="text-white text-sm">Or</span>
                <div className="flex-1 h-px bg-[#ffffff1e]"></div>
            </div>

            <div className='flex mx-auto gap-2'>
                <div>
                    <label>User Name</label>
                    <input
                        type="text"
                        className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-[95%]'
                        placeholder='eg. Jhon'
                    />
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-[95%]'
                        placeholder='eg. Jhon Francisco'
                    />
                </div>
            </div>

            <div className='py-4'>
                <label className='block'>Email</label>
                <input
                    type="email"
                    className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-full'
                    placeholder='eg. jhonfrancisco@gmail.com'
                />
            </div>

            <div>
                <label className='block'>Password</label>
                <input
                    type="password"
                    className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-full'
                    placeholder='Enter your password'
                />
                <p className='text-sm py-2'>Must be atleast 8 characters.</p>
            </div>
            <button className='w-full bg-white text-black py-2 my-4 rounded-lg'>Sign Up</button>

            <h2 className='text-center text-[#ffffff8e]'>Already have an Account? <span className='text-white hover:border-b cursor-pointer' onClick={goLogIn}>Log In</span></h2>
        </form>
    )
}

export default SignupForm