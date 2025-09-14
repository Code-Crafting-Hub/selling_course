import React from 'react'
import logo from '../assets/logo1.png'

export default function Navbar() {
  return (
    <div className='flex items-center justify-between text-white container mx-auto'>
        <div className=''>
            <img src={logo} alt="" className='w-16 h-16 rounded-full' />
            <h1>Code Crafting Hub</h1>
        </div>
        <div>Right</div>
    </div>
  )
}
