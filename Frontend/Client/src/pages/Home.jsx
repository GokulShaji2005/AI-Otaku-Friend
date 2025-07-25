import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Chat from "./Chat";
import { FaSquareGithub } from "react-icons/fa6";

const Home = () => {
  const [menuIcon, setMenuIcon] = useState(false);

  // const [open,setOpen]=useState(false)
  //  <Chat setMenuIcon={setMenuIcon} />
  const toggle = () => {
    setMenuIcon((e) => !e);
  };
  return (
    <>
      <div className="bg-[url('/assets/blueBackground.jpg')] bg-cover bg-center relative h-screen">
        <div className="absolute inset-0 bg-black/70 text-[#D8F4F6] flex flex-col font-audiowide">
          <nav className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-wide">AniMate</div>
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
                    className="hover:text-cyan-400"
                    onClick={toggle}
                  >
                    Home
                  </NavLink>
                  <NavLink
                   
                    className="hover:text-cyan-400"
                           onClick={() =>  toggle && (window.location.href = "/Chat")}
                  >
                    Chat
                  </NavLink>
                  <NavLink
                    to="/News"
                    end
                    className="hover:text-cyan-400"
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
                    isActive ? "underline" : ""
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Chat"
                  end
                  className={({ isActive }) => (isActive ? "underline" : "")}
                     onClick={() => (window.location.href = "/Chat")}
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

          <section className="flex-1 flex items-center justify-center px-6 relative">
            <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-cyan-400/20 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-pink-400/20 rotate-12 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rotate-45 animate-bounce"></div>

            <div className="text-center flex flex-col items-center space-y-6 max-w-4xl relative z-10">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight">
                  <span className="inline-block animate-fade-in-up">Chat</span>{" "}
                  <span className="inline-block animate-fade-in-up animation-delay-100">
                    with
                  </span>{" "}
                  <span className="inline-block animate-fade-in-up animation-delay-200">
                    Your
                  </span>
                </h2>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">
                  Ultimate Otaku Friend
                </h2>
              </div>

              <div className="relative">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
                  AniMate
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent opacity-50 blur-sm animate-pulse">
                  AniMate
                </div>
              </div>

              <p className="text-sm md:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-500">
                Dive into the world of anime with your AI companion. Get
                recommendations, discuss your favorite shows, and explore the
                endless universe of Japanese animation.
              </p>

              <div className="animate-fade-in-up animation-delay-600">
                <button
                  type="button"
                  className="group relative mt-8 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  onClick={() => (window.location.href = "/Chat")}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Chat Now
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                </button>
              </div>
            </div>
          </section>
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
    </>
  );
};

export default Home;
