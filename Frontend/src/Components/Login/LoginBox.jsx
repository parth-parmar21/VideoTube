import React from 'react'
import LoginForm from './LoginForm'
import LoginLmage from './LoginLmage'

const LoginBox = () => {
    return (
        <div className='flex bg-black h-[95vh] w-[70vw] m-auto'>
            <div className='h-full w-[45%]'>
                <LoginForm />
            </div>
            <div className='h-full w-[55%] py-5 pr-5'>
            <LoginLmage />
            </div>
        </div>
    )
}

export default LoginBox