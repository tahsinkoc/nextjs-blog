'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {}
type Response = {
    name: string,
    token: string
}
const login = (props: Props) => {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState({ show: false, message: '' })
    const Login = async () => {
        const data = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, password: password })
        })

        const res = await data.json()
        if (res.token) {
            localStorage.setItem('token', JSON.stringify(res))
            router.back()
        } else {
            setErr({ show: true, message: res.message })
            setTimeout(() => {
                setErr({ show: false, message: res.message })
            }, 3000);
        }

        console.log(res)
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {
                err.show ? <div className='absolute top-5 py-4 bg-pink-200 px-2 flex items-center justify-center w-48 fade text-pink-800'>
                    <div>{err.message}</div>
                </div> : <></>
            }
            <div className='w-[35rem] shadow bg-[#050505] rounded  px-4 py-8 border-pink-700'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-pink-500'>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' className='w-full bg-mainBg px-3 py-2 my-2 outline-none focus:border-pink-900 text-pink-200 focus:border rounded' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-pink-500'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='w-full bg-mainBg px-3 py-2 my-2 outline-none focus:border-pink-900 text-pink-200 focus:border rounded' />
                </div>
                <div>
                    <button onClick={Login} className='px-8 py-2 rounded right-0 hover:bg-pink-700 transition-all mt-4 bg-pink-800 text-pink-200'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default login