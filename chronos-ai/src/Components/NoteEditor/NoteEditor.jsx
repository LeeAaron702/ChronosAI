import React, { useEffect, useState } from "react";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";
import Spinner from 'react-bootstrap/Spinner'; 


const NoteEditor = ({ currentNote, updateNoteTitle }) => {
  const { id: noteId, workspace_id: workspaceId } = currentNote;
  const [initialContent, setInitialContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the note content when the component mounts or the noteId/workspaceId changes.
  useEffect(() => {
    setIsLoading(true); // Reset loading state on note change

    const fetchNoteContent = async () => {
      try {
        const response = await fetch("/api/getNoteContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId, workspaceId }),
        });
        const data = await response.json();

        // Set the initial content if it exists.
        if (data[0] && data[0].content) {
          setInitialContent(JSON.parse(data[0].content));
        }
      } catch (error) {
        console.error("Error fetching note content:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure.
      }
    };

    if (noteId && workspaceId) {
      fetchNoteContent();
    }
  }, [noteId, workspaceId]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
        <Spinner animation="grow" variant="secondary" />
      </div>
    );
  }

  return (
    <div className="mx-3">
      <NoteTitle currentNote={currentNote} updateNoteTitle={updateNoteTitle} />
      <NoteContent 
        currentNote={currentNote} 
        initialContent={initialContent} 
      />
    </div>
  );
};

export default NoteEditor;
