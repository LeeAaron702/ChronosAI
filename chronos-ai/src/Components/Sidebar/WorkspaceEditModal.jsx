// WorkspaceEditModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkspaceEditModal = ({ show, handleClose, workspaceId, workspaceName, onEdit }) => {
  const [newTitle, setNewTitle] = useState(workspaceName);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTitle('')
    onEdit(workspaceId, newTitle);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Workspace Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Button variant="outline-dark" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkspaceEditModal;
