import React from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { UserButton } from '@clerk/clerk-react';

const CustomNavbar = () => {
  const { user } = useUser();

  return (
    <Navbar bg="light" expand="lg" sticky="top" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ marginLeft: '2%' }}>Chronos AI</Navbar.Brand>
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
