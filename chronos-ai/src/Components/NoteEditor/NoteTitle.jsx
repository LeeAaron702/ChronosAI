import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const NoteTitle = ({ currentNote, updateNoteTitle }) => {
  const [noteTitle, setNoteTitle] = useState(currentNote.title);
  const [error, setError] = useState("");

  useEffect(() => {
    setNoteTitle(currentNote.title);
    setError(""); // Reset error on note change
  }, [currentNote]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNoteTitle(newTitle);

    // Check if the title length is at the maximum
    if (newTitle.length >= 255) {
      setError("Title cannot be more than 255 characters");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    const trimmedTitle = noteTitle.trim(); // Trim whitespace
    updateNoteTitle(currentNote.id, trimmedTitle);
  };

  return (
    <div>
      <TextareaAutosize
        value={noteTitle}
        onChange={handleTitleChange}
        onBlur={handleBlur}
        placeholder="Untitled"
        maxLength={255}
        style={{
          fontSize: "3em",
          fontWeight: "bold",
          border: error ? "2px solid red" : "none",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          color: "#3F3F3F",
          resize: "none",
        }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default NoteTitle;
