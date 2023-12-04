import React, { useState } from "react";
import {
  Accordion,
  OverlayTrigger,
  Popover,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEllipsisH,
  faCaretDown,
  faCaretRight,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import WorkspaceEditModal from "./WorkspaceEditModal";

const WorkspaceList = ({ workspaces, onEdit, onDelete, onCreateNote }) => {
  const [activeKey, setActiveKey] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const openEditModal = (workspace) => {
    setSelectedWorkspace(workspace);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedWorkspace(null);
  };

  const handleCreateNote = (workspaceId) => {
    onCreateNote(workspaceId);
  };

  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  const popover = (workspace) => (
    <Popover id={`popover-${workspace.id}`}>
      <Popover.Body>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => openEditModal(workspace)}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(workspace.id, workspace.name);
          }}
          className="ms-2"
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Accordion defaultActiveKey={activeKey}>
      {workspaces.map((workspace) => {
        const eventKey = workspace.id; // Use workspace id as eventKey
        return (
          <Accordion.Item
            eventKey={eventKey}
            key={workspace.id}
            style={{ border: "none", marginBottom: "8px" }} // Inline style to remove border and decrease vertical space
          >
            <Container fluid>
              <Row
                className="align-items-center"
                style={{ minHeight: "48px" }} // Decrease vertical height
                >
                <Col xs={1} className="text-center">
                  <FontAwesomeIcon
                    icon={activeKey === eventKey ? faCaretDown : faCaretRight}
                    size="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggle(eventKey)}
                  />
                </Col>
                <Col xs={7}>
                  <span
                    style={{
                      cursor: "pointer",
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                    }}
                  >
                    {workspace.name}
                  </span>
                </Col>
                <Col xs={2} className="text-end">
                  <OverlayTrigger
                    trigger="hover"
                    placement="bottom"
                    overlay={<Popover id={`popover-add-${workspace.id}`}><Popover.Body>Add a note</Popover.Body></Popover>}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="sm"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCreateNote(workspace.id)}
                    />
                  </OverlayTrigger>
                </Col>
                <Col xs={1} className="text-end">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover(workspace)}
                    rootClose
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      size="sm"
                      style={{ cursor: "pointer", float: "right" }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </OverlayTrigger>
                </Col>
              </Row>
            </Container>
            <Accordion.Collapse eventKey={eventKey}>
              <div style={{ padding: "8px 16px" }}>No pages inside</div>
            </Accordion.Collapse>
          </Accordion.Item>
        );
      })}
      <WorkspaceEditModal
        show={showEditModal}
        handleClose={closeEditModal}
        workspaceId={selectedWorkspace?.id}
        workspaceName={selectedWorkspace?.name}
        onEdit={onEdit}
      />
    </Accordion>
  );
};

export default WorkspaceList;
