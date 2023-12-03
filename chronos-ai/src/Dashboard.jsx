import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Components/Sidebar/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [workspaceTitles, setWorkspaceTitles] = useState([]);

  const fetchWorkspaces = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/getWorkspaces?userId=${user.id}`);
        if (response.ok) {
          const titles = await response.json();
          setWorkspaceTitles(titles);
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
    <Container fluid className="px-0">
      <Row className="g-0">
        <Sidebar
          userId={user?.id}
          workspaceTitles={workspaceTitles}
          fetchWorkspaces={fetchWorkspaces}
        />
        <Col md={10} className="dashboard-content">
          <h1>Dashboard</h1>
          {user && <p>Welcome, {user.firstName}!</p>}
          {/* Your dashboard content here */}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
