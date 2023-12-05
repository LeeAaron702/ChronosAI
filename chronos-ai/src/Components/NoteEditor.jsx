import React from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

const NoteEditor = ({ note }) => {
  // Creates a new editor instance.
  const editor = useBlockNote({});

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"light"} />;
};

export default NoteEditor;
