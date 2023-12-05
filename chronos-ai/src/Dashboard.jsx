import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import NoteEditor from "./Components/NoteEditor";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [workspaces, setWorkspaces] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [notesTitles, setNotesTitles] = useState([]);
  // const [notes, setNotes] = useState([]);

 

  // Fetch for notes
  const fetchAllNotesTitles = async (workspaceIds) => {
    try {
      const response = await fetch("/api/getAllNotesTitles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workspaceIds }), // Send workspace IDs in the request body
      });
      if (response.ok) {
        const noteTitles = await response.json();
        setNotesTitles(noteTitles);
      } else {
        console.error("Failed to fetch note titles");
      }
    } catch (error) {
      console.error("Error fetching note titles:", error);
    }
  };

  const createNote = async (workspaceId) => {
    try {
      const response = await fetch("/api/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workspaceId, userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const newNote = await response.json();
      setCurrentNote(newNote);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleNoteClick = (note) => {
    setCurrentNote(note);
  };



  //  Fetch for workspaces
  const fetchWorkspaces = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/getWorkspaces?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkspaces(data);
        } else {
          console.error("Failed to fetch workspaces");
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]); // Only re-run the effect if 'user' changes

  // Effect for fetching all notes titles after workspaces are fetched
  useEffect(() => {
    if (workspaces.length > 0) {
      const workspaceIds = workspaces.map((workspace) => workspace.id);
      fetchAllNotesTitles(workspaceIds);
    }
  }, [workspaces]); // Only re-run the effect if 'workspaces' changes

  return (
    <Container fluid>
      <Row className="g-0">
        <Col md={3} lg={2}>
          <Sidebar
            fetchWorkspaces={fetchWorkspaces}
            workspaces={workspaces}
            onCreateNote={createNote}
            fetchAllNotesTitles={fetchAllNotesTitles}
            notesTitles={notesTitles}
            userId={user.id}
            onNoteClick={handleNoteClick}
            currentNote={currentNote}
          />
        </Col>
        <Col md={9} lg={10}>
          <div className="dashboard-content">
            {currentNote && <NoteEditor note={currentNote} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
