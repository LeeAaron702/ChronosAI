import { notesIndex } from "./pinecone";
import { getEmbedding } from "./openAiEmbedding";
import { createClient } from "@supabase/supabase-js";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OpenAI API Key is not set");
}

const openai = new OpenAI(apiKey);


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  console.log('chat.js')
  try {
    const body = await req.json();
    const messages = body.messages;
    const workspaceId = body.data.workspaceId;

    console.log("Workspace ID:", workspaceId);
    // console.log("🚀 ~ file: chat.js:9 ~ POST ~ body:", body);
    // console.log("🚀 ~ file: chat.js:10 ~ POST ~ messages:", messages);

    const messagesTruncated = messages.slice(-6);
    console.log(
      "🚀 ~ file: chat.js:20 ~ POST ~ messagesTruncated:",
      messagesTruncated
    );

    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join("\n")
    );
    // console.log("🚀 ~ file: chat.js:19 ~ POST ~ embedding:", embedding);

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 2,
      filter: { workspaceId: workspaceId.toString() },
    });
    console.log(
      "🚀 ~ file: chat.js:36 ~ POST ~ vectorQueryResponse:",
      vectorQueryResponse
    );

    // Fetch relevant notes using Supabase
    const noteIds = vectorQueryResponse.matches.map((match) => match.id);
    const { data: relevantNotes, error } = await supabase
      .from("notes")
      .select("id, title, parsed_text")
      .in("id", noteIds);

    if (error) {
      console.error("Error fetching relevant notes:", error);
      throw error;
    }

    console.log("relevant notes found: ", relevantNotes);

    const systemMessage = {
      role: "assistant",
      content:
        "You are an intelligent note-taking app. Respond in a conversational manner without telling me 'according to my..' You answer the user's questions based on their existing notes." +
        "The relevant notes for the query are:\n" +
        relevantNotes
          .map(
            (note) => `Title: ${note.title} \n\nContent:\n${note.parsed_text}`
          )
          .join("\n\n"),
    };
    console.log("🚀 ~ file: chat.js:55 ~ POST ~ systemMessage:", systemMessage);

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      stream: true,
      messages: [systemMessage, ...messagesTruncated],
    });
    console.log("🚀 ~ file: chat.js:62 ~ POST ~ response:", response);

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
