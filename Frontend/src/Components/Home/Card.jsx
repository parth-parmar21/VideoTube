import React, { useState } from 'react'

const Card = () => {
const [user, setUser] = useState(null)
    const urls = async () => {
        const res = await axios.post(
            "http://localhost:8000/api/v1/users/register",
            data
        ); 

        const user = res.data.data;
        setUser(res.data.data)
        
    }
    return (
        <div className='flex flex-wrap'>
            <div className='h-80 w-90 my-5 mx-5'>
                <div className='h-[50%] w-full'>
                    <img src=""
                        className='object-cover h-full w-full'
                        alt=""
                    />
                </div>
                <div className='flex gap-4 h-[50%] w-full py-2'>
                    <div className='bg-red-300 rounded-4xl h-10 w-20'>

                    </div>
                    <div>
                        <h2 className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt voluptatum alias sint!</h2>
                        <p className='font-light pt-1'>Lorem ipsum dolor sit amet.</p>
                        <p className='font-light'>User name</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card