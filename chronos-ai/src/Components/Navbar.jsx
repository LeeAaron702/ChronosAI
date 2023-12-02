import React from 'react';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
  const { user } = useUser();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Chronos AI</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          {user ? (
            <UserButton className="btn btn-outline-primary" afterSignOutUrl='/' />
          ) : (
            <div className="btn-group" role="group" aria-label="Authentication buttons">
              <SignInButton buttonMode="button" className="btn btn-primary" />
              <SignUpButton buttonMode="button" className="btn btn-secondary" />
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
