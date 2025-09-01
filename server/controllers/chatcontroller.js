import { Groq } from "groq-sdk";
import axios from "axios";
import 'dotenv/config'

export async function chatWithOtakuAI(message) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  try {
    if (!Array.isArray(message) || message.length === 0) {
      throw new Error("Message history is required");
    }

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: message,
    });

    return chatCompletion.choices[0]?.message?.content;
  } catch (error) {
    console.error(
      "Groq Chat Error:",
      error.response?.data || error.message || error
    );
    throw new Error("Failed to get response from Otaku AI.");
  }
}
