import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./openAi";
import { notesIndex } from "./pinecone";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).send("Method Not Allowed");
  }

  const { noteId, workspaceId, noteTitle, content, parsedText } = req.body;


  if (!noteId || !workspaceId || content === undefined) {
    return res
      .status(400)
      .json({ error: "Note ID, Workspace ID, and content are required" });
  }

  const { error: supabaseError } = await supabase
    .from("notes")
    .update({ content: content, parsed_text: parsedText })
    .eq("id", noteId)
    .eq("workspace_id", workspaceId);

    if (supabaseError) {
      console.error("Error saving note content:", supabaseError);
      return res.status(500).json({ error: "Error saving note content" });
    }
    
    // console.log("Note Content Saved");
  // Get embedding for the updated note content

  const embedding = await getEmbedding(
    noteTitle + "\n\n" + parsedText
  );
  // console.log(
  //   "🚀 ~ file: saveNoteContent.js:38 ~ handler ~ embedding:",
  //   embedding
  // );

  // Upsert the embedding into Pinecone
  try {
    await notesIndex.upsert([
      {
        id: noteId.toString(), // Pinecone IDs are typically strings
        values: embedding,
        metadata: { workspaceId: workspaceId.toString() }, // Ensure the workspaceId is stored as a string
      },
    ]);

    return res
      .status(200)
      .json({ message: "Note content and embedding saved successfully" });
  } catch (pineconeError) {
    console.error("Error upserting note embedding:", pineconeError);
    return res.status(500).json({ error: "Error upserting note embedding" });
  }
}
