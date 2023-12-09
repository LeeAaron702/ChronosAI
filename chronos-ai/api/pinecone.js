import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
    throw new Error("Pinecone API Key is not set");
}

const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey,
});

export const notesIndex = pinecone.Index("chronos-ai");
