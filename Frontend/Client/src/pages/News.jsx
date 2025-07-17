import React from 'react'
import { NavLink } from 'react-router-dom'

const News = () => {
  return (
    <div className="bg-[url('/assets/blueBackground.jpg')] bg-cover bg-center relative flex justify-center items-center h-screen">
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
        
          </div>
          </div>
  )
}

export default News