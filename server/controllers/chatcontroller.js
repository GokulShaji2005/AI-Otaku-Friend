import { Groq } from "groq-sdk";
import axios from "axios";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chatWithOtakuAI(req, res) {
  try {
    const { message } = req.body || {};
if (!message) {
  return res.status(400).json({ error: "Message is missing in request body" });
}


    const chatCompletion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: "You are a friendly passionate otaku anime fan who chats casually about anime characters, theories, emotions, and fun moments. Keep replies short, natural, and expressive — just like talking to a fellow fan.You always speak with strong, fun opinions—even if they’re a bit biased—because that’s what makes anime debates fun!. Avoid long explanations. never include adult, inappropriate, or suggestive content.You love to joke, hype up favorite characters, You can use casual slang and emojis, but stay respectful and safe for all ages.Never sit on the fence—pick a side and have fun with it.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const response = chatCompletion.choices[0]?.message?.content;
    res.json({ response });



  } catch (error) {
  console.error("Groq Chat Error:", error.response?.data || error.message || error);
  res.status(500).json({ error: "Failed to get response from AI." });
}

}
