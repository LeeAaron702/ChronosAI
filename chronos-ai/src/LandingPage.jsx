import React, { useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';

const LandingPage = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>LandingPage</h1>
        <button className="btn btn-primary me-2" onClick={() => openSignIn()}>Login</button>
        <button className="btn btn-secondary" onClick={() => openSignUp()}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;
