'use client'
import Navbar from '@/components/Navbar';
import ShortedPost from '@/components/ShortedPost'
import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactMarkdown from 'react-markdown';
const markdownContent = `
  # Başlık

  Bu bir **Markdown** içeriği örneğidir. Burada *italik* ve **kalın** metinler, [bağlantılar](https://www.example.com) ve daha fazlası var.
  
  - Liste öğesi 1
  - Liste öğesi 2
  - Liste öğesi 3
  `;
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
            <title>Posts</title>
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