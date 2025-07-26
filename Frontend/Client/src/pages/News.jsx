import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
const NewsApi = import.meta.env.VITE_API_URL;

const News = () => {
  const [Articles, setArticles] = useState([]);
  const [menuIcon, setMenuIcon] = useState(false);
  const toggle = () => {
    setMenuIcon((e) => !e);
  };
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${NewsApi}/animeNews`);
        console.log("API response:", res.data.articles);
        if (res.data && Array.isArray(res.data.articles)) {
          setArticles(res.data.articles);
        } else {
          console.log("No vslid articles");
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching anime news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-[url('/assets/blueBackground.jpg')] bg-repeat bg-top min-h-screen">
      <div className="bg-black/70 text-[#D8F4F6] flex flex-col font-audiowide min-h-screen">
        <nav className="p-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-wide">AniMate</div>
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
                  to="/Chat"
                  end
                  className="hover:text-cyan-400"
                    onClick={() => toggle && (window.location.href = "/Chat")}
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
                  isActive ? "underline-offset-1" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Chat"
                end
                className={({ isActive }) => (isActive ? "underline" : "")}
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

        {Articles.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-25">
            {/* <div className="loader mb-4"></div>
            <div class="loader-inner"></div>
        <div class="loader-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div> */}
            <div class="loader">
              <div class="loader-inner"></div>
              <div class="loader-dots"></div>
            </div>
            <p className="text-[linear-gradient(45deg,_#ff6b9d,_#4ecdc4)] ...text-lg">
              Loading...
            </p>
          </div>
        ) : (
          <div className="flex flex-1 justify-center items-center px-2 py-4 ">
            <div className="w-full max-w-2xl min-h-[30vh] md:max-w-4xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] bg-no-repeat p-2 md:p-4 rounded-2xl shadow-2xl flex flex-col border border-white/20 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Articles.map((article, i) => (
                  <div
                    key={i}
                    className="p-4 shadow-md rounded-xl bg-white hover:shadow-xl transition"
                  >
                    <img
                      src={article.image}
                      alt="Article"
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <h3 className="text-md font-semibold line-clamp-2 text-[#1e3c72]">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 tesxt-sm">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </p>
                    <a
                      href={article.link}
                      className="text-blue-600 hover:underline text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
