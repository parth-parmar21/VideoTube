import React from 'react'
import google from '../../assets/icon-google.svg'
import github from '../../assets/icon-github.svg'
const SignupForm = () => {
    return (
        <div className='h-full w-full py-10 text-center text-white'>
            <form>
                <h2
                    className='capitalize font-medium text-2xl'
                >sign up account
                </h2>
                <p
                    className='text-(--txt-light) py-1'
                >
                    Enter your personal data to create account</p>
                    <div className='flex gap-3 justify-center w-full p-2'>
                    <button
                        className='border-[#ffffff1e] border rounded px-5 py-2 w-[9vw] flex items-center gap-2'
                    >
                        <img src={google} alt="google" />
                        Google
                    </button>
                    <button
                        className='border-[#ffffff1e] border rounded px-5 py-2 w-[9vw] flex items-center gap-2'
                    >
                        <img src={github} alt="github" />
                        Github
                    </button>

                    </div>
                <div className="flex items-center mx-auto w-[80%] gap-3 py-1">
                    <div className="flex-1 h-px bg-[#ffffff1e]"></div>
                    <span className="text-white text-sm">Or</span>
                    <div className="flex-1 h-px bg-[#ffffff1e]"></div>
                </div>
            </form>
        </div>
    )
}

export default SignupForm