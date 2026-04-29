import React, { useEffect, useState } from 'react'
import github from '../../assets/icon-github.svg'
import google from '../../assets/icon-google.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const goSignUp = () => {
        navigate("/signup")
    }

        const formSubmit = async (e) => {
            e.preventDefault()
            console.log("API CALL STARTED"); // 👈 add this

            try {
                const res = await axios.post("http://localhost:8000/api/v1/users/login",
                    formData
                )
                localStorage.setItem("token", res.data.data.accessToken)

                navigate("/home")
            } catch (error) {
                console.error(error.response?.data || error.message);
            }

        }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <form className='h-full py-10 px-15 flex flex-col justify-center'
            onSubmit={(e) => {
                formSubmit(e)
            }}
        >
            <div className='text-center'>
                <h2 className='capitalize font-medium text-2xl'>
                    log in account
                </h2>
                <p className='text-(--txt-light) py-1'>
                    Enter your credential to create account
                </p>
            </div>

            <div className='py-4'>
                <label className='block'>Email</label>
                <input
                    type="email"
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
                    type="password"
                    name='password'
                    className='bg-(--bg-dark) rounded-lg py-2 px-3 mt-2 w-full'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    value={formData.password}
                />
                <p className='text-sm py-2'>Must be atleast 8 characters.</p>
            </div>

            <div className="flex items-center mx-auto w-[80%] gap-3 pb-4">
                <div className="flex-1 h-px bg-[#ffffff1e]"></div>
                <span className="text-white text-sm">Or</span>
                <div className="flex-1 h-px bg-[#ffffff1e]"></div>
            </div>

            <button
                type='button'
                className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center m-2'
            >
                <img src={google} alt="google" />
                Google
            </button>
            <button
                type='button'
                className='border-[#ffffff1e] border rounded px-8 py-2 flex items-center gap-2 justify-center m-2'
            >
                <img src={github} alt="github" />
                Github
            </button>

            <button className='w-full bg-white text-black py-2 my-4 rounded-lg'>Log In</button>

            <h2 className='text-center text-[#ffffff8e]'>Don't have an Account? <span className='text-white hover:border-b cursor-pointer' onClick={goSignUp}>Sign Up</span></h2>
        </form>
    )
}

export default LoginForm