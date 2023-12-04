import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Components/Sidebar/Sidebar';
import NoteEditor from './Components/NoteEditor'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [workspaces, setWorkspaces] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const handleCreateNote = (workspaceId) => {
    // Logic to create a new note
    setCurrentNote({ workspaceId, content: "" }); // This is just a placeholder
  };

  const fetchWorkspaces = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/getWorkspaces?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkspaces(data);
        } else {
          console.error('Failed to fetch workspaces');
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchWorkspaces();
    }
  }, [user, navigate]);

  return (
    <Container fluid >
      <Row className="g-0">
        <Col md={3}
        lg={2}
        >
          <Sidebar userId={user?.id} workspaces={workspaces} fetchWorkspaces={fetchWorkspaces} />
        </Col>
        <Col md={9} lg={10}>
          <div className="dashboard-content">
          {currentNote && <NoteEditor note={currentNote} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
