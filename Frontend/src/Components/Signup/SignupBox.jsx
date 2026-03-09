import React from 'react'
import SignupImage from './SignupImage'
import SignupForm from './SignupForm'

const SignupBox = () => {
    return (
        <div className='flex bg-black h-[90vh] w-[70vw] m-auto p-5'>
            <div className='h-full w-[60%]'>
                <SignupImage />
            </div>
            <div className='h-full w-[40%]'>
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupBox