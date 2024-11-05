"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Shorten = () => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [generated, setGenerated] = useState('');
    const [pending, setPending] = useState(false);


    useEffect(() => {
        setPending(url === '' || shortUrl === '');
    }, [url, shortUrl]);


    const generate = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setPending(true);
        setGenerated('');

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            url: url,
            shortUrl: shortUrl,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch('/api/generate', requestOptions)
            const result = await response.json()
            console.log(result);

            // Use conditional logic to show toast notifications
            if (result.success) {
                toast.success(result.message);
                setGenerated(`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`);
            } else {
                toast.error(result.message);
            }
            setUrl('');
            setShortUrl('');
        } catch (error) {
            console.error('error', error);
            toast.error("Internal Server Error");
        } finally {
            setPending(false)
        }
    };

    return (
        <div className='flex flex-col gap-4 mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg'>
            <div><Toaster /></div>
            <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
            <form onSubmit={generate}>
                <div className='flex flex-col gap-3'>
                    <input
                        type='text'
                        value={url}
                        className='px-4 py-2 focus:outline-purple-600 rounded-md'
                        placeholder='Enter your URL'
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <input
                        type='text'
                        value={shortUrl}
                        className='px-4 py-2 focus:outline-purple-600 rounded-md'
                        placeholder='Enter your preferred short URL text'
                        onChange={(e) => setShortUrl(e.target.value)}
                    />
                    <button
                        type='submit'
                        disabled={pending}
                        className='bg-purple-500 shadow-lg rounded-lg px-3 py-1.5 my-3 text-white hover:scale-[1.01] transition-all disabled:bg-purple-400'
                    >
                        {/* {pending ? 'Generating...' : 'Generate'} */}
                        Generate
                    </button>
                </div>
            </form>
            {generated && (
                <>
                    <span>Your Link</span>
                    <Link target='_blank' href={generated}>
                        <code className='bg-gray-300 px-4 py-2 rounded-lg'>{generated}</code>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Shorten;
