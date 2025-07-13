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
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server=http.createServer(app);
const io= new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
  },
})
// // Emulate __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// Serve index.html from backend
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

io.on("connection", chatSocket)



const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api', router); 

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
