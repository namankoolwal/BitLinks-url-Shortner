import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between bg-purple-700 px-12 h-16 text-white'>
            <div className="logo font-bold text-lg">
                <Link href='/'> BitLinks</Link>
            </div>
            <div>

                <ul className='flex items-center justify-center gap-5'>
                    <Link href='/'> <li>Home</li></Link>
                    <Link href='/about'> <li>About</li></Link>
                    <Link href='/shorten'> <li>Shorten</li></Link>
                    <Link href='/contact'> <li>Contact Us</li></Link>

                    <Link href='/shorten'> <li className=' bg-purple-500 shadow-lg rounded-lg px-3 py-1.5'>Try Now</li></Link>
                    <Link href='/github' target="_blank"> <li className=' bg-purple-500 shadow-lg rounded-lg px-3 py-1.5'>Github</li></Link>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar
