import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './Components/Navbar'; // Make sure the path is correct

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
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
