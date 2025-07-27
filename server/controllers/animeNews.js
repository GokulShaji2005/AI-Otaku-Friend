import axios from "axios";
import Parser from "rss-parser";
import * as cheerio from "cheerio";

const parser = new Parser();
const RSS_URL = [
  "https://www.animenewsnetwork.com/all/rss.xml",
  "https://myanimelist.net/rss/news.xml",
  "https://comicbook.com/anime/rss/",
  "https://otakuusamagazine.com/feed/",
  "https://www.animeherald.com/feed/",
  "https://kotaku.com/tag/anime/rss",
  "https://www.animefeminist.com/feed/",
  "https://honeysanime.com/feed/",
  "https://nerdist.com/tag/anime/feed/",
  "https://www.themarysue.com/tag/anime/feed/",
];

export async function animeNews(req, res) {
  try {
    const feeds = await Promise.all(
      RSS_URL.map(async (url) => {
        try {
          return await parser.parseURL(url);
          console.log(`✅ Parsed ${url} — ${feeds.items.length} items`);
        } catch (err) {
          console.error(`Error parsing ${url}:`, err.message);
          return { items: [] };
        }
      })
    );
    const feedItems = feeds.flatMap((feed) => feed.items);

    const animeKeywords = [
      "Dr. Stone",
      "Black Clover",
      "Demon Slayer",
      "Naruto",
      "That Time I Got Reincarnated as a Slime",
      "Pokemon",

     
      "Attack on Titan",
      "Jujutsu Kaisen",
      "One Piece",
      "Solo Leveling",
      "Kaiju No. 8",
      
      
      "Spy x Family",
      "Dandadan",
      "Mashle",
      "Death Note",
      "Fullmetal Alchemist: Brotherhood",
      "Dragon Ball",
      "Chainsaw Man",
      "Blue Lock",
      "Noragami",
      "Erased",
      "Vinland Saga",
      "Code Geass",
      "Steins;Gate",
      "Mob Psycho 100",
      "Akame ga Kill!",
      "Re:Zero - Starting Life in Another World",

      "Hunter x Hunter",

      "No Game No Life",
      "Zom 100: Bucket List of the Dead",
    ];
    function detectAnime(text) {
      return animeKeywords.filter((name) =>
        text.toLowerCase().includes(name.toLowerCase())
      );
    }

    const newsItems = feedItems
      .map((item) => {
        const text = (
          (item.title || "") + (item.contentSnippet || "")
        ).toLowerCase();
        const detected = detectAnime(text);

        if (detected.length > 0) {
          return { ...item, detectedAnime: detected };
        }

        return null;
      })

      .filter((item) => item !== null);

    const articles = await Promise.all(
      newsItems.map(async (item) => {
        let imageUrl = null;

        try {
          const articlePage = await axios.get(item.link);
          const $ = cheerio.load(articlePage.data);
          imageUrl = $('meta[property="og:image"]').attr("content") || null;
        } catch (err) {
          console.warn(`Failed to fetch image for: ${item.link}`);
        }
        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          detectedAnime: item.detectedAnime,
          image: imageUrl,
        };
      })
    );
    res.json({ articles });
    console.log(articles);
  } catch (error) {
    console.error("Anime News Error:", error.message);
    res.status(500).json({ error: "Failed to fetch anime news with images" });
  }
}
