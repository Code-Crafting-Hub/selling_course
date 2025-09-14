import React from 'react'
import Navbar from '../components/Navbar'

export default function home() {
  return (
    <div className='bg-gradient-to-r from-blue-900 to-pink-900'>
      <div className='h-screen'>
        {/* Header */}
        <header>
          <Navbar/>
        </header>

        {/* Main section */}
        <section>section 1</section>
        <section>section 2</section>

        {/* footer */}
        <footer>footer</footer>
      </div>
    </div>
  )
}
