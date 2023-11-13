'use client'
import Navbar from '@/components/Navbar'
import ShortedPost from '@/components/ShortedPost'

type item = {
    id: number,
    image: string,
    title: string,
    content: string
}

const page = async ({ params }: { params: { id: string } }) => {

    async function getPost(_id: string): Promise<item> {
        const data = await fetch(`http://localhost:3000/posts/${_id}`)
        const res = await data.json()
        return res
    }
    const data = await getPost(params.id)
    console.log(data);

    return (
        <>
            <Navbar />
            <div className='lg:w-7/12 w-full mx-auto'>
                <title>{data.title}</title>
                <ShortedPost item={data} mod={1} />
            </div>
        </>
    )
}

export default page