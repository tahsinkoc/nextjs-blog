'use client'
import Navbar from '@/components/Navbar';
import ShortedPost from '@/components/ShortedPost'
import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
type Props = {
    item: object[]
}

type FetchData = {
    id: number,
    image: string,
    title: string,
    content: string
}

const page = (props: Props) => {
    const [Data, setData] = useState<FetchData[]>([])
    useEffect(() => {
        fetch('http://localhost:3000/posts/')
            .then(res => res.json())
            .then(res => {
                setData(res)
                console.log(res)
            })
    }, [])
    return (
        <div className='bg-mainBg'>
            <Navbar />
            <div className='lg:w-7/12 w-full mx-auto'>
                {
                    Data.map((item, index) => {
                        return (
                            <ShortedPost mod={0} key={index} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page