'use client';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const handleRequest = () => {
        fetch('http://localhost:3000/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: image, title: title, content: value })
        })
    }

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <div className='bg-[#0f0f0f] w-full py-9'>
            <div className='w-8/12 mx-auto'>
                <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' className='w-full rounded my-4 py-3 px-4 outline-none border-none' />
                </div>
                <ReactQuill modules={modules} formats={formats} theme='snow' value={value} onChange={setValue} className='border-none outline-none h-[45rem] w-full mx-auto relative bg-white'></ReactQuill>
                <button onClick={handleRequest} className='my-16 px-8 py-3 bg-green-400 text-white rounded shadow-sm'>Save</button>
            </div>
        </div>
    )
}

export default page