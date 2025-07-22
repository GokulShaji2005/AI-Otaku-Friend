import express from "express";
import { AnimeNews } from "../controllers/animeNews.js";

const router = express.Router();

router.get("/news", AnimeNews);



export default router;

