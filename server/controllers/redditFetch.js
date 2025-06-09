
import snoowrap from 'snoowrap';
import dotenv from "dotenv";
dotenv.config();


import path from 'path';
import { fileURLToPath } from 'url';

const redditFetch = fileURLToPath(import.meta.url);
const controllers = path.dirname(redditFetch);

dotenv.config({ path: path.resolve(controllers, '../.env') }); 

// const reddit = new snoowrap({
//   userAgent: process.env.USER_AGENT
//   clientId: process.env.REDDIT_CLIENT_ID,
//   clientSecret: process.env.REDDIT_CLIENT_SECRET,
//   username: process.env.REDDIT_USERNAME,
//   password: process.env.REDDIT_PASSWORD
// });



// async function fetchAnimeStoryUpdates() {
//   try {

//     const posts = await reddit.getSubreddit('AnimeDiscussion').getNew({ limit: 20 });

//     posts.forEach(post => {
      
//       const text = (post.title + ' ' + post.selftext).toLowerCase();
//       if (text.includes('episode') || text.includes('story') || text.includes('spoiler')) {
//         console.log('Title:', post.title);
//         console.log('URL:', post.url);
//         console.log('Text snippet:', post.selftext.substring(0, 200));
//         console.log('Created:', new Date(post.created_utc * 1000).toLocaleString());
//         console.log('----------------------------------------');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// }

// fetchAnimeStoryUpdates();

