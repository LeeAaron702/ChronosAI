// RegisterUserPage.jsx
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const RegisterUserPage = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();


  const registerUser = async (user) => {

    try {
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: user.clerkUserId,
          email: user.email,
          name: user.name,
        })
      });
      const data = await response.json();
      console.log('Registration response:', data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      const register = async () => {
        try {
          await registerUser({
            clerkUserId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName,
          });
          navigate('/dashboard'); // Or wherever you want to redirect after registration
        } catch (error) {
          console.error('Registration error:', error);
          // Handle registration error
        }
      };

      register();
    }
  }, [isSignedIn, user, navigate]);

  // Display a loading indicator or similar while the registration is processed
  return (
    <div>Loading...</div>
  );
};

export default RegisterUserPage;
