// WorkspaceEditModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkspaceEditModal = ({ show, handleClose, workspace, workspaceName, onEdit }) => {
  const [newTitle, setNewTitle] = useState(workspaceName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspace) {
      onEdit(workspace.id, newTitle);
    } else {
      console.error("Cannot edit: Workspace is null");
    }
    setNewTitle('');
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
