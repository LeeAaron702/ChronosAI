import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './Components/Navbar'; // Ensure the path is correct

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // Redirect to landing page if not signed in
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <CustomNavbar />
      <div className="container mt-4">
        <h1>Dashboard</h1>
        {user && <p>Welcome, {user.firstName}!</p>}
      </div>
    </div>
  );
}

export default Dashboard;
