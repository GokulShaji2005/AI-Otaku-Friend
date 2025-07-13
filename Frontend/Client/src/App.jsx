import { useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { useEffect } from 'react'


const socket=io(import.meta.env.VITE_BACKEND_URL)

socket.on("connect",()=>{
  console.log("Client connected",socket.id)
})



socket.on("disconnect",()=>{
  console.log("Client disconnected",socket.id)
})
function App() {

  const [userMessage,setUserMesage]=useState("");
  const [AIreply,setAIreply]=useState("")
  const [messageArrays,setMessageArrays]=useState([]);
  const sendMessage=()=>{
    if(userMessage.trim() === '')return;
    socket.emit("chatFromUser",userMessage);
    setUserMesage('');
  }
 

 useEffect(()=>{
  
  const msgFromBackend=(msg)=>{
    setAIreply(msg)
    // setMessageArrays((prev)=>[...prev,msg])
    console.log(msg);
  }

  socket.on("responseFromAI",msgFromBackend);
  

  return ()=>socket.off("responseFromAI",msgFromBackend);
 },[])
  return (
<>
<div>
  <h2>Otaku AI Chat</h2>
<input
   value={userMessage}
   placeholder='Enter the message'
   onChange={(e)=>setUserMesage(e.target.value)}
   />
  <button onClick={sendMessage}>Send</button>

</div>

<div>
{AIreply}
</div>
    </>
  )
}

export default App
