import React, { useState } from 'react';
import { Accordion, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEllipsisH, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const WorkspaceList = ({ workspaceTitles, onEdit, onDelete }) => {
  const [activeKey, setActiveKey] = useState(null);

  // This function is used to toggle the accordion
  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  const popover = (workspaceId, title) => (
    <Popover id={`popover-${workspaceId}`}>
      <Popover.Body>
        <Button variant="outline-secondary" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(workspaceId, title); }}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={(e) => { e.stopPropagation(); onDelete(workspaceId, title); }} className="ms-2">
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Accordion defaultActiveKey={activeKey}>
      {workspaceTitles.map((title, index) => {
        const eventKey = String(index);
        return (
          <Accordion.Item eventKey={eventKey} key={index} style={{ border: 'none', minHeight: '56px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 16px' }}
              onClick={() => handleToggle(eventKey)}
            >
              <FontAwesomeIcon
                icon={activeKey === eventKey ? faCaretDown : faCaretRight}
                size="sm"
                style={{ cursor: 'pointer'}}
              />
              <span style={{ flexGrow: 1, margin: '2px 40px', cursor: 'pointer' }}>{title}</span>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover(index, title)} rootClose>
                <FontAwesomeIcon 
                  icon={faEllipsisH} 
                  size="sm" 
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => e.stopPropagation()} 
                />
              </OverlayTrigger>
            </div>
            <Accordion.Collapse eventKey={eventKey}>
              <div style={{ padding: '8px 16px' }}>
                No pages inside
              </div>
            </Accordion.Collapse>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default WorkspaceList;
