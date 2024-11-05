"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const Shorten = () => {

    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [generated, setGenerated] = useState('');

    const generate = () => {
        setGenerated("")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shortUrl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setGenerated(`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`);
                setUrl("");
                setShortUrl("");
                alert(result.message);
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className='flex flex-col gap-4 mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg'>
            <h1 className='font-bold text-2xl' >Generate your short URLs</h1>
            <div className='flex flex-col gap-3'>
                <form>

                <input type="text"
                    value={url}
                    className='px-4 py-2 focus:outline-purple-600 rounded-md'
                    placeholder="Enter your URL"
                    onChange={(e) => setUrl(e.target.value)}
                    />
                <input type="text"
                    value={shortUrl}
                    className='px-4 py-2 focus:outline-purple-600 rounded-md'
                    placeholder="Enter your prefered short URL text"
                    onChange={(e) => setShortUrl(e.target.value)}
                    />
                <button className='bg-purple-500 shadow-lg rounded-lg px-3 py-1.5 my-3 text-white hover:scale-[1.01] transition-all' onClick={generate}>Generate</button>
            </form>
            </div>
            {generated && <>
                <span>Your Link</span>
                <Link target='_blank' href={generated}><code>{generated}</code></Link>
            </>}
        </div>
    )
}

export default Shorten
