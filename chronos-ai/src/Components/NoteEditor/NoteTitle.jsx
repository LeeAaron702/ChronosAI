import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const NoteTitle = ({ currentNote, updateNoteTitle }) => {
  const [noteTitle, setNoteTitle] = useState(currentNote.title);

  useEffect(() => {
    setNoteTitle(currentNote.title);
  }, [currentNote]);

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleBlur = () => {
    if (noteTitle !== currentNote.title) {
      updateNoteTitle(currentNote.id, noteTitle);
    }
  };

  return (
    <TextareaAutosize
      value={noteTitle}
      onChange={handleTitleChange}
      onBlur={handleBlur}
      placeholder="Untitled"
      style={{
        fontSize: "3em",
        fontWeight: "bold",
        border: "none",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        color: "#3F3F3F",
        resize: "none",
      }}
    />
  );
};

export default NoteTitle;
