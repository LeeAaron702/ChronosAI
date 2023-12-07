import React from "react";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";

const NoteEditor = ({ currentNote, currentNoteId, updateNoteTitle }) => {
  return (
    <div className="mx-3">
      <NoteTitle currentNote={currentNote} updateNoteTitle={updateNoteTitle} />
      <div>

      <NoteContent currentNote={currentNote} />
      </div>
    </div>
  );
};

export default NoteEditor;
