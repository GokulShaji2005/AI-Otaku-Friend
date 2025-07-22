// app.js
import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';


const {json} =pkg;
import  {Server} from 'socket.io';
import http from 'http'

import router from './routes/chat.js'; 
import chatSocket from './controllers/chatsocket.js';
import axios from 'axios';
import { useEffect } from 'react';


const app = express();
const server=http.createServer(app);
const io= new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
  },
})


io.on("connection", chatSocket)

useEffect(()=>{
  axios.get("http://localhost:5000/api/news")
  .then(res =>{
    
  })

})



const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api', router); 
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
