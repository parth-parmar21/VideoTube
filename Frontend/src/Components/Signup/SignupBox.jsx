import React from 'react'
import SignupImage from './SignupImage'
import SignupForm from './SignupForm'

const SignupBox = () => {
    return (
        <div className='flex bg-black h-[95vh] w-[70vw] m-auto'>
            <div className='h-full w-[55%] py-5 pl-5'>
                <SignupImage />
            </div>
            <div className='h-full w-[45%]'>
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupBox