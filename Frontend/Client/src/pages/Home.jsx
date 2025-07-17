import React from 'react'
import { NavLink } from 'react-router-dom'


const Home = () => {
  return (
    <>
      <div className="bg-[url('/assets/blueBackground.jpg')] bg-cover bg-center relative h-screen">
        <div className="absolute inset-0 bg-black/70 text-[#D8F4F6] flex flex-col font-audiowide">
          <nav className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-wide">AniMate</div>
              <div className="flex gap-8 text-lg">
                <NavLink to="/" end className={({ isActive }) => isActive ? "underline-offset-1" : ""}>Home</NavLink>
                <NavLink to="/Chat" end className={({ isActive }) => isActive ? "underline" : ""}>Chat</NavLink>
                <NavLink to="/News" end className={({ isActive }) => isActive ? "underline" : ""}>News</NavLink>
              </div>
            </div>
          </nav>
          <section className="h-screen flex items-center">
            <div className="ml-8 md:ml-12 font-audiowide text-3xl md:text-5xl font-bold space-y-2 flex flex-col items-start">
              <div>Chat with Your</div>
              <div className='mt-6'>Ultimate Otaku Friend</div>
              <div className="text-4xl md:text-6xl text-[#00ffc3] mt-6">AniMate</div>
              
              <button type="button" className='mt-8 px-8 py-3 bg-[#00ffc3] text-black rounded-lg font-semibold text-xl shadow-lg hover:bg-[#00e6b2] transition-all'>
                Chat Now
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home