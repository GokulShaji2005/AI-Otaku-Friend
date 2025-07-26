import React, { useRef } from "react";
import { FaSquareGithub } from "react-icons/fa6";

import { useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const socket = io(import.meta.env.VITE_API_URL);

socket.on("connect", () => {
  console.log("Client connected", socket.id);
});

socket.on("disconnect", () => {
  console.log("Client disconnected", socket.id);
});

const mobileView = () => window.innerWidth < 768;
const Chat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const userMessageRef = useRef([]);
  const [messageArrays, setMessageArrays] = useState([]);
  const ScrollRef = useRef(null);
  const IsMobileUi = mobileView();
  const [menuIcon, setMenuIcon] = useState(false);
  const toggle = () => {
    setMenuIcon((e) => !e);
  };

  useEffect(() => {
    if (messageArrays.length === 0) {
      const greeting = {
        sender: null,
        ai: "Konnichiwa! I’m your Otaku buddy! Let's talk anime and get charged ⚡️ 🎌",
      };
      userMessageRef.current.push(greeting);
      setMessageArrays([...userMessageRef.current]);

      const msgFromBackend = (data) => {
        userMessageRef.current = userMessageRef.current.filter(
          (msg) => msg.ai != "..."
        );
        const AiMsgRef = { sender: null, ai: data };
        userMessageRef.current.push(AiMsgRef);
        setMessageArrays([...userMessageRef.current]);
      };

      socket.on("responseFromAI", msgFromBackend);

      return () => {
        socket.off("responseFromAI", msgFromBackend);
      }; // cleanup
    }
  }, []);
  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    socket.emit("chatFromUser", inputMessage);

    const useMsgRef = { sender: inputMessage, ai: null };
    userMessageRef.current.push(useMsgRef);
    setMessageArrays([...userMessageRef.current]);
    setInputMessage("");
    setTimeout(() => {
      const typingMsg = { sender: null, ai: "..." };
      userMessageRef.current.push(typingMsg);
      setMessageArrays([...userMessageRef.current]);
    }, 2000);
  };
  const chatBottomRef = () => {
    ScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    chatBottomRef();
  }, [messageArrays]);

  return (
    <div className="bg-[url('/assets/blueBackground.jpg')] bg-cover bg-center min-h-screen w-full flex flex-col">
      <div className="bg-black/70 text-[#D8F4F6] flex flex-col font-audiowide min-h-screen w-full">
        <nav className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="text-2xl font-bold tracking-wide md:text-left">
              AniMate
            </div>
            {/* Menu Icon */}
            <div
              className="md:hidden absolute top-6 right-6 z-50  "
              onClick={toggle}
            >
              <div className="space-y-1">
                <div className="w-8 h-1 bg-[#D8F4F6] rounded"></div>
                <div className="w-8 h-1 bg-[#D8F4F6] rounded"></div>
                <div className="w-8 h-1 bg-[#D8F4F6] rounded"></div>
              </div>
            </div>

            {menuIcon && (
              <div className="absolute top-16 right-4 z-40 w-48 text-center text-white bg-black/80 rounded-lg shadow-xl py-4 px-3 flex flex-col space-y-3 text-lg font-medium md:hidden">
                <NavLink
                  to="/"
                  end
                  className="hover:text-cyan-400 "
                  onClick={toggle}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Chat"
                  end
                  className="hover:text-cyan-400"
                  onClick={toggle}
                >
                  Chat
                </NavLink>
                <NavLink
                  to="/News"
                  end
                  className="hover:text-cyan-400 "
                  onClick={toggle}
                >
                  News
                </NavLink>
              </div>
            )}

            <div className="flex gap- md:gap-15 text-lg max-md:hidden">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "underline-offset-1 " : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Chat"
                end
                className={({ isActive }) => (isActive ? "underline" : "")}
                onClick={() => toggle && (window.location.href = "/Chat")}
              >
                Chat
              </NavLink>
              <NavLink
                to="/News"
                end
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                News
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="flex flex-1 justify-center items-center px-2 py-4">
          <div
            className="w-full max-w-2xl md:max-w-4xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-2 md:p-4 rounded-2xl shadow-2xl flex flex-col justify-between border border-white/20"
            style={{ height: "80vh" }}
          >
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-white text-center">
              Otaku AI Chat
            </h2>
            <div
              className="flex-1 overflow-y-auto mb-2 md:mb-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-2 md:p-4 space-y-2"
              style={{ minHeight: 0, maxHeight: "60vh" }}
            >
              {messageArrays &&
                messageArrays.map((msg, index) => (
                  <div
                    className={
                      msg.sender
                        ? "flex justify-end font-thin text-white"
                        : "font-thin text-white"
                    }
                    key={index}
                    ref={ScrollRef}
                  >
                    {msg.sender && (
                      <>
                        <div className="flex justify-end items-start gap-2 m-2">
                          <div className=" break-words max-w-[85%] md:max-w-[65%] bg-gradient-to-r from-blue-500 to-blue-600 text-white/90 text-sm px-4 py-2 rounded-lg rounded-tr-sm  whitespace-pre-wrap">
                            {msg.sender}
                          </div>
                          <img
                            src="/assets/profile.webp"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full shadow-md"
                          />
                        </div>
                      </>
                    )}
                    {msg.ai && (
                      <div className="flex justify-start items-start gap-2 m-2">
                        <img
                          src="/assets/chatbot.jpg"
                          alt="AI Avatar"
                          className="w-10 h-10 rounded-full shadow-md"
                        />

                        <div className="break-words max-w-[85%] md:max-w-[65%] bg-gradient-to-r from-white/30 to-white/20 text-white/90 text-sm px-4 py-2 rounded-lg rounded-tl-sm whitespace-pre-wrap">
                          {msg.ai === "..." ? (
                            <span className="animate-blink text-gray-400 ">
                              ...
                            </span>
                          ) : (
                            msg.ai
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-2">
              <input
                value={inputMessage}
                placeholder="Enter your message..."
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 p-2 md:p-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2a5298] transition"
              />
              <button
                onClick={sendMessage}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-[#D8F4F6] text-[#1e3c72] font-bold hover:bg-[#b6e0ea] transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <footer className="w-full text-center text-xs text-gray-500 py-2 flex justify-center items-center gap-2">
          Made with ❤️ by{" "}
          <span className="text-pink-600 font-semibold">Gokul</span> —
          <a
            href="https://github.com/GokulShaji2005/AI-Otaku-Friend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition"
          >
            <FaSquareGithub className="text-xl" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
