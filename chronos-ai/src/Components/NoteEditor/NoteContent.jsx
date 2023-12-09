import React, { useCallback } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import debounce from "lodash.debounce";

const NoteContent = ({ currentNote, initialContent }) => {
  const { id: noteId, title: noteTitle, workspace_id: workspaceId } = currentNote;
  // console.log("🚀 ~ file: NoteContent.jsx:8 ~ NoteContent ~ noteTitle:", noteTitle)
  // console.log("🚀 ~ file: NoteContent.jsx:8 ~ NoteContent ~ currentNote:", currentNote)

  // Save function that sends updated content to the server.
  const saveContent = async (newContent, parsedText, noteTitle) => {
    try {
      const response = await fetch("/api/saveNoteContent", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId, workspaceId, noteTitle, content: newContent, parsedText }),
      });
      console.log("🚀 ~ file: NoteContent.jsx:21 ~ saveContent ~ response:", response)

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

  const extractPlainText = (blocks) => {
    const extractTextFromBlock = (block) => {
      // Extract text from the current block's content
      const textContent = block.content.map(inlineContent => inlineContent.text || '').join("");
  
      // Recursively process and extract text from child blocks if they exist
      const childrenText = block.children 
        ? block.children.map(childBlock => extractTextFromBlock(childBlock)).join("\n")
        : '';
  
      return textContent + (childrenText ? `\n${childrenText}` : '');
    };
  
    return blocks.map(extractTextFromBlock).join("\n");
  };

  // Initialize the BlockNote editor with the fetched content.
  const editor = useBlockNote({
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      const newContent = JSON.stringify(editor.topLevelBlocks);
      const parsedText = extractPlainText(editor.topLevelBlocks); // This is your parsed_text
      debouncedSaveContent(newContent, parsedText, noteTitle)
      // Extract and log plain text content
      console.log("Extracted Plain Text:", parsedText);
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
