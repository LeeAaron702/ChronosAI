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
  onWorkspaceTitleClick
}) => {
  const [activeKey, setActiveKey] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handleWorkspaceTitleClick = (workspaceId) => {
    onWorkspaceTitleClick(workspaceId);
  };


  const openEditModal = (workspace) => {
    setSelectedWorkspace(workspace);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedWorkspace(null);
  };

  const handleCreateNote = (workspaceId) => {
    setActiveKey(workspaceId.toString());
    onCreateNote(workspaceId);
  };

  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };


  const titlePopover = (title) => (
    <Popover>
      <Popover.Body>{title}</Popover.Body>
    </Popover>
  );

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
            <Card.Header
              style={{
                padding: "0.5rem .1rem",
                background: "transparent",
                border: "none",
              }}
            >
              <Container fluid>
                <Row>
                  <Col xs={1} sm={1}>
                    <CustomToggle eventKey={eventKey} callback={handleToggle}>
                      <FontAwesomeIcon
                        icon={
                          activeKey === eventKey ? faCaretDown : faCaretRight
                        }
                        size="sm"
                      />
                    </CustomToggle>
                  </Col>
                  <Col sm={7} md={8} lg={7} xl={8} xxl={9}>
                    {/* <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="top"
                      overlay={titlePopover(workspace.name)}
                    > */}
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
                      onClick={() => handleWorkspaceTitleClick(workspace.id)}
                    >
                      {workspace.name}
                    </span>
                    {/* </OverlayTrigger> */}
                  </Col>
                  <Col xs={1} sm={1}>
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
                  <Col xs={1} sm={1}>
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
                  {notesTitles
                    .filter((note) => note.workspace_id === workspace.id)
                    .map((note) => {
                      const isActive = note.id === currentNote?.id;
                      const activeStyle = isActive
                        ? { 
                          backgroundColor: "#D5D5D5", // Dark grey background
                          color: "black", // Black text
                          borderRadius: '4px', // Rounded corners similar to Notion style
                          // width: '100%'
                         }
                        : {};

                      return (
                        <Nav.Item key={note.id} style={{ width: "100%" }}>
                          <Nav.Link
                            onClick={() => onNoteClick(note.id)}
                            style={{
                              cursor: "pointer",
                              overflowWrap: "break-word",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              // width: "80%",
                              display: "block",
                              color: "black",
                              padding: '3px 15px', // Reduced vertical padding, adjust as necessary
                              ...activeStyle, // Apply custom active style here
                            }}
                            title={note.title}
                          >
                            {note.title || "Untitled"}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
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
