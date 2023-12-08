import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; 

const NoteHeader = ({ onDelete }) => {
  return (
    <div className="d-flex justify-content-end mt-2">
      <FontAwesomeIcon 
        icon={faTrashAlt} 
        onClick={onDelete}
        style={{ cursor: 'pointer', color: 'red', fontSize: '1.5rem' }}
        title="Delete Note" 
      />
    </div>
  );
};

export default NoteHeader;
