import React from "react";
import { Accordion, Col, useAccordionButton } from "react-bootstrap";
import AddWorkspace from "./AddWorkspace";
import WorkspaceList from "./WorkspaceList";

const Sidebar = ({
  userId,
  workspaces,
  fetchWorkspaces,
  onCreateNote,
  notesTitles,
  fetchNotes,
  onNoteClick,
}) => {
  // Custom hook to toggle accordion on small screens
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <div onClick={decoratedOnClick} style={{ width: "100%" }}>
        {children}
      </div>
    );
  }

  const onEdit = async (workspaceId, newTitle) => {
    try {
      const response = await fetch("/api/updateWorkspace", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workspaceId, newTitle }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchWorkspaces();
    } catch (error) {
      console.error("Error updating workspace:", error);
    }
  };

  const onDelete = async (workspaceId, title) => {
    try {
      const response = await fetch("/api/deleteWorkspace", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workspaceId, title }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming that the deletion was successful
      // const data = await response.json();

      // Now, you can update the list of workspaces
      await fetchWorkspaces();
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const workspaceList = (
    <WorkspaceList
      workspaces={workspaces}
      notesTitles={notesTitles}
      onEdit={onEdit}
      onDelete={onDelete}
      onCreateNote={onCreateNote}
      fetchNotes={fetchNotes}
      onNoteClick={onNoteClick}
    />
  );

  const addWorkspace = (
    <AddWorkspace userId={userId} fetchWorkspaces={fetchWorkspaces} />
  );

  return (
    <>
      {/* This div will only show on small screens */}
      <div className="d-block d-md-none">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <CustomToggle eventKey="0">Menu</CustomToggle>
            </Accordion.Header>
            <Accordion.Body>
              {addWorkspace}
              {workspaceList}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* This div will hide on small screens and show on medium and larger screens */}
      <Col className="d-none d-md-flex flex-column align-items-left">
        {addWorkspace}
        {workspaceList}
      </Col>
    </>
  );
};

export default Sidebar;
