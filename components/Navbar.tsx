'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {

}

const Navbar = (props: any) => {
    type dataState = {
        name: string,
        token: string
    }
    const [data, setData] = useState<dataState>()

    useEffect(() => {
        const res = localStorage.getItem('token')
        if (res) {
            const parsed = JSON.parse(res)
            console.log(parsed)
            setData(parsed)
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        setData(undefined)
    }

    return (
        <>
            {data ? <div className='w-full bg-secondary relative flex items-center lg:justify-end justify-center border-b border-b-pink-800 px-8 py-3'>
                <div className='text-white flex items-center'>
                    <Link href={'/posts'} className='mr-4 px-3 py-1 hover:bg-pink-600 hover:text-pink-100 transition-all'>Posts</Link>
                    <Link href={'/editor'} className='mr-4 px-3 py-1 hover:bg-pink-600 hover:text-pink-100 transition-all'>Write something</Link>
                    <button onClick={logOut} className='mr-8 px-3 py-1 hover:bg-pink-600 hover:text-pink-100 transition-all'>Log Out</button>
                    <div className='text-xl rounded bg-pink-800 px-8'>{data.name}</div>
                </div>
            </div> : <div className='w-full bg-secondary relative flex items-center justify-end border-b border-b-pink-800 px-8 py-2'>
                <div className='text-white flex items-center'>
                    <Link href={'/posts'} className='mr-4 px-3 py-1 hover:bg-pink-600 hover:text-pink-100 transition-all'>Posts</Link>
                    <Link href={'/editor'} className='mr-4 px-3 py-2 hover:bg-pink-600 hover:text-pink-100'>Write something</Link>
                    <Link href={'/login'} className='mr-4 px-3 py-2 hover:bg-pink-600 hover:text-pink-100'>Login</Link>
                </div>
            </div>}
        </>
    )
}

export default Navbar