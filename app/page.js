import Image from 'next/image'
import React from 'react'
import localFont from 'next/font/local'
import Link from 'next/link';

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

const page = () => {
  return (
    <main>
      <section className='grid grid-cols-2 h-screen bg-purple-100' style={{ height: 'calc(100vh - 4rem)' }}>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <p className={`font-bold text-lg ${poppins.className}`}>The Best URL Shortner in the market</p>
          <p>We are the most straightfordward URl Shortner in the World</p>
          <div>
          <Link href='/shorten'> <span className=' bg-purple-400 shadow-lg rounded-lg px-3 py-1.5'>Try Now</span></Link>
          <Link href='/github' target="_blank"> <span className=' bg-purple-400 shadow-lg rounded-lg px-3 py-1.5'>Github</span></Link>
          </div>
        </div>

        <div className='relative flex justify-start'>
          <Image src={'/vector.png'} alt='image' className=' mix-blend-darken' fill='true' />
        </div>
      </section>
    </main>
  )
}

export default page
