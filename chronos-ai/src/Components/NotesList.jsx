import React from 'react';

const NotesList = ({ notes }) => {
  return (
    <div>
      <h3>Notes in Workspace</h3>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.id} - {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
