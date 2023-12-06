import React, { useState } from "react";
import {
  Accordion,
  Card,
  OverlayTrigger,
  Popover,
  Button,
  Container,
  Row,
  Col,
  Nav,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import {
  faEdit,
  faTrashAlt,
  faEllipsisH,
  faCaretDown,
  faCaretRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import WorkspaceEditModal from "./WorkspaceEditModal";

function CustomToggle({ children, eventKey, callback }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    callback(eventKey);
  });

  return (
    <span style={{ cursor: "pointer" }} onClick={decoratedOnClick}>
      {children}
    </span>
  );
}

const WorkspaceList = ({
  workspaces,
  notesTitles,
  onEdit,
  onDelete,
  onCreateNote,
  onNoteClick,
  currentNote,
}) => {
  console.log("🚀 ~ file: WorkspaceList.jsx:46 ~ notesTitles:", notesTitles);
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
    <Accordion activeKey={activeKey}>
      {workspaces.map((workspace) => {
        const eventKey = workspace.id.toString();
        return (
          <Card
            key={workspace.id}
            style={{ background: "transparent", border: "none" }}
          >
            {" "}
            {/* Apply inline CSS here */}
            <Card.Header
              style={{
                padding: "0.5rem .1rem",
                background: "transparent",
                border: "none",
              }}
            >
              <Container fluid>
                <Row className="no-gutters">
                  <Col xs={1} sm={1} className="">
                    <CustomToggle eventKey={eventKey} callback={handleToggle}>
                      <FontAwesomeIcon
                        icon={
                          activeKey === eventKey ? faCaretDown : faCaretRight
                        }
                        size="sm"
                      />
                    </CustomToggle>
                  </Col>
                  <Col xs={8} sm={7}>
                    <span
                      style={{
                        cursor: "pointer",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        // maxWidth: '150px', // Set the max-width to match the width of your sidebar
                        display: "block", // Ensure this behaves as a block-level element for width to work
                      }}
                      title={workspace.name}
                    >
                      {workspace.name}
                    </span>
                  </Col>
                  <Col xs={1} sm={1} className="text-end">
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="bottom"
                      overlay={
                        <Popover id={`popover-add-${workspace.id}`}>
                          <Popover.Body>Add a note</Popover.Body>
                        </Popover>
                      }
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCreateNote(workspace.id)}
                      />
                    </OverlayTrigger>
                  </Col>
                  <Col xs="auto" className="text-end">
                    <OverlayTrigger
                      trigger={["click", "focus"]}
                      placement="bottom"
                      overlay={popover(workspace)}
                      rootClose
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
              <Card.Body
                style={{
                  background: "transparent",
                  border: "none",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <Nav
                  variant="pills"
                  className="flex-column"
                  style={{ width: "100%" }}
                >
                  {" "}
                  {/* Ensure Nav occupies full width */}
                  {notesTitles
                    .filter((note) => note.workspace_id === workspace.id)
                    .map((note) => (
                      <Nav.Item key={note.id} style={{ width: "100%" }}>
                        {" "}
                        {/* Set width to 100% for Nav.Item */}
                        <Nav.Link
                          onClick={() => onNoteClick(note.id)}
                          style={{
                            cursor: "pointer",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "90%", // Set width to 100% for Nav.Link
                            display: "block",
                          }}
                          active={currentNote && currentNote.id === note.id}
                        >
                          {note.title || note.id}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
      <WorkspaceEditModal
        show={showEditModal}
        handleClose={closeEditModal}
        workspace={selectedWorkspace}
        onEdit={onEdit}
      />
    </Accordion>
  );
};

export default WorkspaceList;
