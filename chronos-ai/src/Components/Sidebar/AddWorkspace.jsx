import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddWorkspace = ({ userId, fetchWorkspaces }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addWorkspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, isShared, ownerId: userId }),
      });
      if (response.ok) {
        fetchWorkspaces();
        setShowModal(false);
        setShowAlert(true);
        setTitle('');
        setIsShared(false);

        // Automatically hide the alert after 3 seconds (adjust the time as needed)
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        setShowAlert(false);
      }
    } catch (error) {
      console.error('Error adding workspace:', error);
    }
  };

  return (
    <>
      <Button className="mt-2 mb-1" variant="ghost" onClick={() => setShowModal(true)}>
        Workspace <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group >
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
            <Button variant="outline-dark" type="submit">
              Submit
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
      {/* Bootstrap React Alert positioned at the bottom */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x">
        <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
          Workspace added successfully!
        </Alert>
      </div>
    </>
  );
};

export default AddWorkspace;
