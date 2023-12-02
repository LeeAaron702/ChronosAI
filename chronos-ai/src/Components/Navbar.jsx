import React from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { UserButton } from '@clerk/clerk-react';

const CustomNavbar = () => {
  const { user } = useUser();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Chronos AI</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          {user ? (
            <UserButton className="btn btn-outline-primary" afterSignOutUrl="/" />
          ) : (
            <div className="btn-group" role="group" aria-label="Authentication buttons">
              <SignInButton mode="modal" className="btn btn-primary" />
              <SignUpButton mode="modal" className="btn btn-secondary" afterSignUpUrl="/register-user" />
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
