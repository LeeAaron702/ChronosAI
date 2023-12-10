import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const NoteTitle = ({ currentNote, updateNoteTitle, onDelete }) => {
  const [noteTitle, setNoteTitle] = useState(currentNote.title);
  const [error, setError] = useState("");

  useEffect(() => {
    setNoteTitle(currentNote.title);
    setError(""); // Reset error on note change
  }, [currentNote]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNoteTitle(newTitle);

    if (newTitle.length >= 255) {
      setError("Title cannot be more than 255 characters");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    const trimmedTitle = noteTitle.trim();
    updateNoteTitle(currentNote.id, trimmedTitle);
  };

  return (
    <div className="d-flex">
      <div style={{ flexGrow: 1 }}>
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
      <FontAwesomeIcon 
        icon={faTrashAlt} 
        onClick={onDelete}
        style={{ cursor: 'pointer', color: 'red', fontSize: '1.5rem', marginTop: '20px' }}
        title="Delete Note" 
      />
    </div>
  );
};

export default NoteTitle;
