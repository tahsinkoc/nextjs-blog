'use client';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
type Props = {}

const page = (props: Props) => {

    const [value, setValue] = useState(String)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(String)

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'indent',
        'link', 'image', 'video', 'blockquote', 'code-block', 'color', 'background', 'font', 'align'
    ];
    const router = useRouter();
    const handleRequest = () => {
        let tokenNonParsed = localStorage.getItem('token')
        let token
        if (tokenNonParsed) {
            token = JSON.parse(tokenNonParsed ?? 'null')
        } else {
            token = { token: 'asd' }
        }

        fetch('http://localhost:3000/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'AuthToken': token.token
            },
            body: JSON.stringify({ image: image, title: title, content: value })
        })
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    setErr({ show: true, message: res.message })
                    setTimeout(() => {
                        setErr({ show: false, message: res.message })
                    }, 3000);
                } else {
                    setErr({ show: true, message: 'Redirecting, ' + res.id })
                    setTimeout(() => {
                        setErr({ show: false, message: err.message })
                        router.push('/post/' + res.id)
                    }, 3000);
                }
            })
    }

    useEffect(() => {
        console.log(value)
    }, [value])

    const [err, setErr] = useState({ show: false, message: '' })

    return (
        <>
            <Navbar />
            {
                err.show ? <div className='absolute top-20 py-4 left-5 bg-pink-200 px-2 flex items-center justify-center w-48 fadeLeft text-pink-800'>
                    <div>{err.message}</div>
                </div> : <></>
            }
            <div className='bg-[#0f0f0f] w-full py-9'>
                <div className='lg:w-8/12 w-11/12 mx-auto'>
                    <div>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' className='w-full rounded my-4 py-3 px-4 outline-none border-none' />
                    </div>
                    <div className='h-[35rem]'>
                        <ReactQuill modules={modules} formats={formats} theme='snow' value={value} onChange={setValue} className='border-none outline-none h-full w-full mx-auto relative bg-white'></ReactQuill>
                    </div>
                </div>
            </div>
            <div className='lg:w-8/12 mx-auto w-11/12 my-8'>
                <button onClick={handleRequest} className='px-8 py-3 bg-green-400 text-white rounded shadow-sm'>Save</button>
            </div>
        </>
    )
}

export default page