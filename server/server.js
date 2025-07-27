// app.js
import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import  {Server} from 'socket.io';
import http from 'http'

import router from './routes/chat.js'; 
import chatSocket from './controllers/chatsocket.js';


const app = express();
const server=http.createServer(app);
const io= new Server(server,{


  cors:{
    origin:"https://animate-ai-anime-friend.vercel.app",
    methods:["GET","POST"],
  },
})


io.on("connection", chatSocket)



const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Routes




server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
