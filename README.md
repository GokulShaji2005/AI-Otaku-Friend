# 🎌 AniMate – Your AI Otaku Friend

Welcome to **AniMate** – an anime-themed conversational AI designed just for otakus!  
Chat about anime theories, jokes, or your favorite waifus while keeping up with the latest anime news – all in a beautifully designed, anime-style dark interface 🌙✨

---

## 🌟 Features

- 🤖 **Conversational AI**  
  Engage in natural, anime-focused conversations with **AniMate**, powered by the blazing-fast **LLaMA3-70B-8192** model via **Groq API**.

- 📰 **Anime News Aggregator**  
  Stay in the loop with fresh anime articles and updates pulled from curated RSS feeds across popular anime news sources.

- 💻 **Modern React Frontend**  
  Built with **React**, **JavaScript**, and **Tailwind CSS**, the UI offers a seamless and responsive anime-style night experience.

- 🔧 **Robust Node.js Backend**  
  Powered by **Express.js**, the backend handles AI communication, API routing, and RSS parsing.

---

## 🛠️ Tech Stack

| Layer       | Technologies                              |
|-------------|-------------------------------------------|
| **Frontend**| React, JavaScript, Tailwind CSS            |
| **Backend** | Node.js, Express.js                        |
| **AI Model**| LLaMA3-70B-8192 via Groq API               |
| **RSS Feeds**| Custom feed parsing using `rss-parser`   |

---

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/GokulShaji2005/AI-Otaku-Friend.git
cd AI-Otaku-Friend

2. Install Dependencies
bash
Copy
Edit
# Backend
cd server
npm install

# Frontend
cd ../client
npm install

3. Configure Environment Variables
Create a .env file inside the server/ directory and add the following:
GROQ_API_KEY=your_groq_api_key_here
RSS_URL=https://example.com/feed1.xml,https://example.com/feed2.xml

4. Run the App
bash
Copy
Edit
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd ../client
npm run dev
Now, open your browser and go to:
👉 http://localhost:5173

You're ready to chat with your new AI otaku friend!

🔌 API Integration
AniMate uses the Groq API to interact with the LLaMA3-70B-8192 model.

Setup:
Create an account at https://groq.com

Generate your API key

Add it to the .env file in the server/ folder as:


GROQ_API_KEY=your_groq_api_key
📰 RSS Feed Integration
AniMate fetches the latest anime articles using RSS feeds.

To edit or add new feeds:

Open the RSS config file (e.g., rssFeeds.js)

Add or remove your preferred feed URLs

Example:

RSS_URL=https://www.animenewsnetwork.com/all/rss.xml,https://www.cbr.com/feed/


🔮 Future Development
🧠 Smarter AI Modes: Add Tsundere, Shounen Hero, Mecha Pilot personalities, etc.

🔐 User Authentication: Save preferences, dark/light themes, chat history

💬 Community Features: Public discussions, forums, chat rooms

📱 Mobile Support: Build a React Native or Flutter app version

🙌 Acknowledgments
💡 Groq API – for lightning-fast access to the LLaMA3-70B-8192 model

⚛️ React & Node.js – for the robust open-source ecosystem

❤️ Anime Community – for endless inspiration and memes

📄 License
MIT License
© 2025 Gokul Shaji

“Built for weebs. Inspired by anime. Powered by AI.”
— AniMate



