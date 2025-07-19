import React, { useRef } from 'react'


import { useState } from 'react'
import { io } from 'socket.io-client'

import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'



const socket=io(import.meta.env.VITE_BACKEND_URL)

socket.on("connect",()=>{
  console.log("Client connected",socket.id)
})



socket.on("disconnect",()=>{
  console.log("Client disconnected",socket.id)
})

const Chat = () => {
    
      const [inputMessage,setInputMessage]=useState("");
      const userMessageRef=useRef([]);
      const [messageArrays,setMessageArrays]=useState([]);
      const ScrollRef=useRef(null);

     useEffect(() => {
        const msgFromBackend=(data)=>{
        const AiMsgRef={sender:null,ai:data};
        userMessageRef.current.push(AiMsgRef);
        setMessageArrays([...userMessageRef.current]);
     
     };
       socket.on("responseFromAI", msgFromBackend);

       return () => socket.off("responseFromAI", msgFromBackend); // cleanup

    
      }, [])
      const sendMessage=()=>{
        if(inputMessage.trim() === '')
          {
            return;
          }

        socket.emit("chatFromUser",inputMessage);

        setInputMessage(inputMessage)
       const useMsgRef={sender:inputMessage,ai:null};
       userMessageRef.current.push(useMsgRef);
       setMessageArrays([...userMessageRef.current])
       setInputMessage('')

      }
      const chatBottomRef=()=>{
         ScrollRef.current?.scrollIntoView({behavior:'smooth'})
      };

      useEffect(()=>{
        chatBottomRef()
      },[messageArrays])
     
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
        <div className='flex-grow flex justify-center items-center mb-10 '>
          <div className='md:h-[85vh]  bg-gradient-to-br from-[#1e3c72] to-[#2a5298] md:w-[80vw]   p-5 rounded-2xl shadow-2xl flex flex-col justify-between border border-white/20'>
            <h2 className="text-3xl font-bold mb-2 text-white text-center">Otaku AI Chat</h2>
            <div className="flex-1 overflow-y-auto mb-6  rounded-lg bg-white/10 p-4" 
            
            >
              {messageArrays && (
                messageArrays.map((msg, index) => (
                  <div className={msg.sender?'flex justify-end font-thin text-white':'font-thin text-white'} key={index}
                     ref={ScrollRef}>
                    {msg.sender && (
                      <div className="mb-6 p-3 rounded-lg text-sm bg-white/50 text-white/80  w-fit max-w-[60%] break-words">{msg.sender}
                    </div>
                    )}
                    {msg.ai && ( <div className="mb-6 p-3 rounded-lg flex justify-end text-sm bg-white/20 text-white w-fit max-w-[80%] break-words ">
                      <span className="font-semibold text-[#D8F4F6]  ">AI:</span> {msg.ai}
                    </div>)}
                
                  </div>
                ))
              )}
              </div>
              
              <div className="flex gap-3">
                <input
                  value={inputMessage}
                  placeholder='Enter your message...'
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2a5298] transition"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 rounded-lg bg-[#D8F4F6] text-[#1e3c72] font-bold hover:bg-[#b6e0ea] transition"
                
               >
                  Send
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  )
}

export default Chat