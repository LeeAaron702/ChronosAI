import React, { useState } from 'react';
import { Modal, Button, Form, Switch } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddWorkspace = ({ userId, fetchWorkspaces }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [isShared, setIsShared] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addWorkspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, isShared, ownerId: userId }), // Include ownerId in the request body
      });
      if (response.ok) {
        fetchWorkspaces(); // Refresh the workspace list
        alert('Workspace added successfully!');
        // Reset form and close modal
        setTitle('');
        setIsShared(false);
        setShowModal(false);
      } else {
        alert('Failed to add workspace.');
      }
    } catch (error) {
      console.error('Error adding workspace:', error);
    }
  };

  return (
    <>
   <Button className="mb-3" variant="ghost" onClick={() => setShowModal(true)}>
        Workspace <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workspace Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workspace title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="switch"
                id="is-shared-switch"
                label="Is Shared"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddWorkspace;
