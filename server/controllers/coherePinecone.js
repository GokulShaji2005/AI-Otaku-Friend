
import snoowrap from 'snoowrap';
import { CohereClient } from "cohere-ai";
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';

const coherePinecone = fileURLToPath(import.meta.url);
const controllers = path.dirname(coherePinecone);

dotenv.config({ path: path.resolve(controllers, '../.env') }); 



const reddit = new snoowrap({
  userAgent: 'Ai-otaku-bot',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});


const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
// controllerHostUrl: process.env.PINECONE_CONTROLLER_HOST,
});

console.log("Using Pinecone index:", process.env.PINECONE_INDEX_NAME);
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

function chunkText(text, maxLength = 500) {
  const sentences = text.split(/(?<=[.?!])\s+/);
  let chunks = [], current = '';
  for (let sentence of sentences) {
    if ((current + sentence).length < maxLength) {
      current += sentence + ' ';
    } else {
      chunks.push(current.trim());
      current = sentence + ' ';
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}


async function fetchEmbedUpload() {

  try{
  const posts = await reddit.getSubreddit('anime').getHot({ limit: 10 });
  let textChunks = [];
  posts.forEach(post => {
    if (post.selftext && post.selftext.length > 50) {
      const fullText = `${post.title}\n${post.selftext}`;
      textChunks.push(...chunkText(fullText));
    }
  });

  if (textChunks.length === 0) {
     console.log("No suitable content found.");
    return;
  }

  const response = await cohere.embed({
    texts: textChunks,
    model: 'embed-english-v3.0',
    input_type: "search_document"

  });
  if (!response?.embeddings) {
      console.error("Embedding failed or malformed response:", response.embeddings);
      return;
  }
  const vectors = textChunks.map((text, i) => ({
    id: `reddit-${Date.now()}-${i}`,
    values: response.embeddings[i],
    metadata: { text, source: "Reddit", subreddit: "anime" },
  }));

  await index.upsert(vectors);
  console.log("Uploaded", vectors.length, "vectors to Pinecone");
  console.log("Cohere embedding response:", response);

} 
catch (err) {
    console.error("Error during fetchEmbedUpload:", err);
  }
}

fetchEmbedUpload().catch(console.error);


export async function searchAnime(query) {

  try{
    const response= await cohere.embed({
      texts:[query],
      model: "embed-english-v3.0",
      input_type: "search_query"
    })

    const queryEmbeddings=response.embeddings[0];

    const searchResults= await index.query({
      vector:queryEmbeddings,
       topK:3, 
      includeMetadata:true
    })

    const matches=searchResults.matches || [];

    if(matches.length===0){
      return "No relevent anime updates";
    }

    return matches.map((match,i)=>({
      score: match.score.toFixed(3),
      text: match.metadata?.text,
      source:match.metadata?.source,
    }));
  } catch (error) {
    console.error("Error during anime search:", error);
    throw error;
  }
}

