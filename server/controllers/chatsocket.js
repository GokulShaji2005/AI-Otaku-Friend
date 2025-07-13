import { chatWithOtakuAI } from "./chatcontroller.js";
import { Socket } from "socket.io";


export default function chatSocket(socket){
  

    const chatHistory=[
        {
            role:"system",
        content:"You are a friendly passionate otaku anime fan who chats casually about anime stories,characters, theories, emotions, and fun moments. Keep replies short, natural, and expressive — just like talking to a fellow fan.You always speak with strong, fun opinions—even if they’re a bit biased—because that’s what makes anime debates fun!. Avoid long explanations. never include adult, inappropriate, or suggestive content.You love to joke, hype up favorite characters, You can use casual slang and emojis, but stay respectful and safe for all ages.Never sit on the fence—pick a side and have fun with it.you know full storylines of every animes",
},
];

socket.on("chatFromUser",async(message)=>{
    try{
          console.log("socket connected for chatsMemory",socket.id);
          console.log(message);
        chatHistory.push({role:'user',content:message});
        const limit = [chatHistory[0], ...chatHistory.slice(-5)];
        const AIreply= await chatWithOtakuAI(limit);

        chatHistory.push({role:'assistant', content:AIreply});
        // console.log(AIreply)
        socket.emit("responseFromAI",AIreply)
       

    }
    catch (err) {
      console.error(" Socket Error:", err.message);
      socket.emit("responseFromAI", " Error processing your message.");
    }
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected:", socket.id);
  });
}