import React from 'react'
import Link from 'next/link'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type Props = {
    item: {
        id: number,
        image: string,
        title: string,
        content: string
    },
    mod: number
}

function ShortedPost({ item, mod }: Props) {

    const contentShorted = item.content.slice(0, 550)
    const set = [contentShorted, item.content]
    const btns = [<Link href={`post/${item.id}`}>
        <button className='bg-pink-800 text-white px-8 py-1 mb-4 rounded'>Read More</button>
    </Link>, <></>]
    return (
        <div className='w-11/12 border-b-2 border-pink-950 my-8 pt-4 px-4'>
            <div className='text-pink-400 text-2xl'>
                {item.title}
            </div>
            <div className='text-gray-500 my-8' dangerouslySetInnerHTML={{ __html: set[mod] }}>
                {/* {item.content} */}
            </div>
            {btns[mod]}
        </div>
    )
}

export default ShortedPost