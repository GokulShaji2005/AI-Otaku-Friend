import express from "express";
import { chatWithOtakuAI} from "../controllers/chatcontroller.js";

const router = express.Router();

router.post("/", chatWithOtakuAI);
// router.get("/news", animeNews);



export default router;

