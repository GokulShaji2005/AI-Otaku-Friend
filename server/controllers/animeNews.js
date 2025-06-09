import axios from "axios";
import Parser from 'rss-parser'
import * as cheerio from 'cheerio';


const parser=new Parser();
const RSS_URL = 'https://www.animenewsnetwork.com/all/rss.xml';

export async function animeNews(req,res) {
  try{
    const feed= await parser.parseURL(RSS_URL);
    
const animeKeywords = ['anime', 'manga', 'otaku', 'japan', 'japanese animation'];

const filtered = feed.items.filter(item => {
  const text = (item.title + item.contentSnippet).toLowerCase();
  return animeKeywords.some(keyword => text.includes(keyword));
});
    const newsItems=feed.items.slice(0,20);

    const articles=await Promise.all(
      newsItems.map(async item=>{
        let imageUrl=null;

        try{
          const articlePage=await axios.get(item.link);
          const $=Cheerio.load(articlePage.data);
          imageUrl=$('meta[property="og:image"]').attr('content') || null;
        }
        catch(err)
        {
              console.warn(`Failed to fetch image for: ${item.link}`);
        }
         return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          image: imageUrl,
        };
      })
    );
    res.json({articles})
  }
  catch (error) {
    console.error("Anime News Error:", error.message);
    res.status(500).json({ error: "Failed to fetch anime news with images" });
  }
  
}