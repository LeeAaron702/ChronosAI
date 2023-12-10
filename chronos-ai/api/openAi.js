import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY;

console.log('openai.js hit')

if (!apiKey) {
  throw new Error("OpenAI API Key is not set");
}

const openai = new OpenAI(apiKey);

export async function getEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    const embedding = response.data[0].embedding;

    if (!embedding) throw new Error("Error generating embedding.");

    return embedding;
  } catch (error) {
    console.error("Error in getEmbedding:", error);
    throw error;
  }
}

export default openai;
