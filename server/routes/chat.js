import express from "express";

import { animeNews } from "../controllers/animeNews.js";


const router = express.Router();



router.get('/',animeNews)


export default router;

