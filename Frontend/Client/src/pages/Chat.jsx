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

const mobileView=()=>window.innerWidth<768;
const Chat = () => {
      const [inputMessage,setInputMessage]=useState("");
      const userMessageRef=useRef([]);
      const [messageArrays,setMessageArrays]=useState([]);
      const ScrollRef=useRef(null);
      const IsMobileUi=mobileView();
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
    
    <div className="bg-[url('/assets/blueBackground.jpg')] bg-cover bg-center min-h-screen w-full flex flex-col">
      <div className="bg-black/70 text-[#D8F4F6] flex flex-col font-audiowide min-h-screen w-full">
        {
          IsMobileUi ? '' :
            <nav className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="text-2xl font-bold tracking-wide text-center md:text-left">AniMate</div>
                <div className="flex flex-row justify-center md:justify-end gap-4 md:gap-8 text-lg">
                  <NavLink to="/" end className={({ isActive }) => isActive ? "underline-offset-1" : ""}>Home</NavLink>
                  <NavLink to="/Chat" end className={({ isActive }) => isActive ? "underline" : ""}>Chat</NavLink>
                  <NavLink to="/News" end className={({ isActive }) => isActive ? "underline" : ""}>News</NavLink>
                </div>
              </div>
            </nav>
        }

        <div className="flex flex-1 justify-center items-center px-2 py-4">
          <div className="w-full max-w-2xl md:max-w-4xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-2 md:p-4 rounded-2xl shadow-2xl flex flex-col justify-between border border-white/20" style={{height: "80vh"}}>
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-white text-center">Otaku AI Chat</h2>
            <div className="flex-1 overflow-y-auto mb-2 md:mb-6 rounded-lg bg-white/10 p-2 md:p-4 space-y-2" style={{minHeight: 0, maxHeight: "60vh"}}>
              {messageArrays && (
                messageArrays.map((msg, index) => (
                  <div
                    className={
                      msg.sender
                        ? "flex justify-end font-thin text-white"
                        : "font-thin text-white"
                    }
                    key={index}
                    ref={ScrollRef}
                  >
                    {msg.sender && (
                      <>

<div className="flex justify-end items-start gap-2 m-2">
  <div className=" break-words max-w-[85%] md:max-w-[65%] bg-white/50 text-white/90 text-sm px-4 py-2 rounded-lg  whitespace-pre-wrap">
    {msg.sender}
  </div>
  <img
    src="/assets/profile.webp"
    alt="Avatar"
    className="w-10 h-10 rounded-full shadow-md"
  />
</div>


                  </>  )
                    }
                    {msg.ai && (
                      <div className="flex justify-start items-start gap-2 m-2">
                        <img
                          src="/assets/chatbot.jpg"
                          alt="AI Avatar"
                          className="w-10 h-10 rounded-full shadow-md"
                        />
                        <div className="break-words max-w-[85%] md:max-w-[65%] bg-white/50 text-white/90 text-sm px-4 py-2 rounded-lg whitespace-pre-wrap">
                          {msg.ai}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-2">
              <input
                value={inputMessage}
                placeholder="Enter your message..."
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 p-2 md:p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2a5298] transition"
              />
              <button
                onClick={sendMessage}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-[#D8F4F6] text-[#1e3c72] font-bold hover:bg-[#b6e0ea] transition"
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