import React, { useEffect, useState } from "react";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";
import Spinner from "react-bootstrap/Spinner";
import NoteHeader from "./NoteHeader";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; 

const NoteEditor = ({ currentNote, updateNoteTitle, fetchAllNotesTitles, workspaces, setCurrentNoteId, user }) => {
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const response = await fetch("/api/deleteNote", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId: currentNote.id }),
        });

        const result = await response.json();
        if (response.ok) {
          // Handle successful deletion, e.g., redirect or update UI
          console.log("Note deleted:", result);
          const workspaceIds = workspaces.map((workspace) => workspace.id);
          await fetchAllNotesTitles(workspaceIds);
          setCurrentNoteId()
        } else {
          // Handle error
          console.error("Failed to delete note:", result.error);
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  if (isLoading || !currentNote) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100%",
          width: "125%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <Spinner animation="grow" variant="secondary" />
      </div>
    );
  }

  return (
    <div className="mx-3">
      {/* <NoteHeader onDelete={handleDelete} /> */}
      <NoteTitle currentNote={currentNote} updateNoteTitle={updateNoteTitle} onDelete={handleDelete}/>
    
      <NoteContent currentNote={currentNote} initialContent={initialContent} />
    </div>
  );
};

export default NoteEditor;
