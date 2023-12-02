import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn } from '@clerk/clerk-react';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import RegisterUserPage from './utils/RegisterUserPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-user" element={<RegisterUserPage />} />
          <Route 
            path="/dashboard" 
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            } 
          />
          {/* Other routes */}
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
