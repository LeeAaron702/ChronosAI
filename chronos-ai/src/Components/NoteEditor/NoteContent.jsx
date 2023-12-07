import React, { useCallback } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import debounce from "lodash.debounce";

const NoteContent = ({ currentNote, initialContent }) => {
  console.log("🚀 ~ file: NoteContent.jsx:7 ~ NoteContent ~ currentNote:", currentNote)
  const { id: noteId, workspace_id: workspaceId } = currentNote;

  // Save function that sends updated content to the server.
  const saveContent = async (newContent) => {
    try {
      const response = await fetch("/api/saveNoteContent", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId, workspaceId, content: newContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Note content saved successfully");
    } catch (error) {
      console.error("Error saving note content:", error);
    }
  };

  // Debouncing the saveContent function to limit frequent calls.
  const debouncedSaveContent = useCallback(debounce(saveContent, 2000), []);

  // Initialize the BlockNote editor with the fetched content.
  const editor = useBlockNote({
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      const newContent = JSON.stringify(editor.topLevelBlocks);
      debouncedSaveContent(newContent);
    },
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
      {/* Displaying the editor content for debugging */}
      {/* <pre>{JSON.stringify(editor.topLevelBlocks, null, 2)}</pre> */}
    </div>
  );
};

export default NoteContent;
