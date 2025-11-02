import express from "express";
import axios from "axios";
import 'dotenv/config'
import bodyParser from "body-parser";
import { chatWithOtakuAI } from "./controllers/chatcontroller.js";
const app=express();
app.use(bodyParser.json());

const BOT_TOKEN=process.env.BOT_API_KEY;


const systemPrompt = {
  role: "system",
  content: "You are a friendly passionate otaku anime fan who chats casually about anime stories,characters, theories, emotions, and fun moments. Keep replies short, natural, and expressive — just like talking to a fellow fan.You always speak with strong, fun opinions—even if they’re a bit biased—because that’s what makes anime debates fun!. Avoid long explanations. never include adult, inappropriate, or suggestive content.You love to joke, hype up favorite characters, You can use casual slang and emojis, but stay respectful and safe for all ages.Never sit on the fence—pick a side and have fun with it.you know full storylines of every animes"
};

const chatHistories = {}; 
export default function telegramBot(app){
app.post("/webhook", async (req, res) => {
  try {
    // console.log("Incoming Telegram update:", JSON.stringify(req.body, null, 2));
    const update = req.body;

    if (!update.message) {
      return res.sendStatus(200);
    }

    const chatID = update.message.chat.id;
    const userMessage = update.message.text;

  
    if (!chatHistories[chatID]) {
      chatHistories[chatID] = [systemPrompt];
    }

    if (userMessage === "/start") {
      chatHistories[chatID] = [systemPrompt];
      await sendMessage(
        chatID,
        "Konnichiwa! I’m your Otaku buddy! Let's talk anime and get charged⚡🎌"
      );
      return res.sendStatus(200);
    }


    chatHistories[chatID].push({ role: "user", content: userMessage });
    const limit = [systemPrompt, ...chatHistories[chatID].slice(-5)];

    res.sendStatus(200);

    const aiReplyBot = await chatWithOtakuAI(limit);
    chatHistories[chatID].push({ role: "assistant", content: aiReplyBot });

    await sendMessage(chatID, aiReplyBot);
    console.log("Sent reply:", aiReplyBot);

  } catch (err) {
  console.error("Bot Error:", err.message);
  if (typeof chatID !== 'undefined') {
    try {
      await sendMessage(chatID, "😅 Oops! My brain glitched, try again!");
    } catch(e) {
      console.error("Failed to send error message:", e.message);
    }
  }
  res.sendStatus(200);
}

});



async function sendMessage(chatId, text) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text,
    });
  } catch (err) {
    console.error("Failed to send message:", err.message);
  }
}
}

// app.listen(PORT_BOT, () => console.log(`Bot server running on port ${PORT_BOT}`));



// app.listen(3000, () => console.log("Bot server running"));


