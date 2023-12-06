import React from "react";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";

const NoteEditor = ({ currentNote, updateNoteTitle }) => {
  return (
    <div className="mx-3">
      <NoteTitle currentNote={currentNote} updateNoteTitle={updateNoteTitle} />
      <div>

      <NoteContent />
      </div>
    </div>
  );
};

export default NoteEditor;
