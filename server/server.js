// app.js
import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import 'dotenv/config'
const {json} =pkg;

import router from './routes/chat.js'; // Import chat routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Replace `json()` from body-parser

// Routes
app.use('/api', router); // Any request to /api/chat goes to chatRoutes\


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
