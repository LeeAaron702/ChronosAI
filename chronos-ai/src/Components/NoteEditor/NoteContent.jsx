import React, { useEffect, useState, useCallback } from 'react';
import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import debounce from 'lodash.debounce';

const NoteContent = ({ currentNote }) => {
  const [content, setContent] = useState('');
  const { id: noteId, workspace_id: workspaceId } = currentNote;

  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState(null);

  // Function to fetch note content
  const fetchNoteContent = async () => {
    try {
      const response = await fetch('/api/getNoteContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, workspaceId }),
      });
      const data = await response.json();
      if (data[0] && data[0].content) {
        setContent(data[0].content);
        setBlocks(data[0].content);
      }
    } catch (error) {
      console.error('Error fetching note content:', error);
    }
  };

  // Initialize the editor with the fetched content
  const editor = useBlockNote({
    initialContent: content ? JSON.parse(content) : undefined,
    onEditorContentChange: (editor) => {
      const newContent = JSON.stringify(editor.topLevelBlocks);
      setContent(newContent);
      debouncedSaveContent(newContent);
    }
  });

  // Fetch the initial content when the component mounts
  useEffect(() => {
    if (noteId && workspaceId) {
      fetchNoteContent();
    }
  }, [noteId, workspaceId]);

  // Save content function (as before)
  const saveContent = async (newContent) => {
    try {
      const response = await fetch('/api/saveNoteContent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, workspaceId, content: newContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle response here if needed (e.g., updating state, showing confirmation message)
      console.log('Note content saved successfully');
    } catch (error) {
      console.error('Error saving note content:', error);
    }
  };

  const debouncedSaveContent = useCallback(debounce(saveContent, 2000), []);

  return (
    <div>
      <BlockNoteView editor={editor} theme={"light"} />
      <pre>{JSON.stringify(blocks, null, 2)}</pre>
    </div>
  );
};

export default NoteContent;

  

//   const saveContent = async (newContent) => {
//     try {
//       await fetch('/api/saveNoteContent', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ noteId, workspaceId, content: newContent }),
//       });
//     } catch (error) {
//       console.error('Error saving note content:', error);
//     }
//   };

//   const debouncedSaveContent = useCallback(debounce(saveContent, 2000), []);

//   const editor = useBlockNote({
//     editable: true,
//     initialContent: content ? JSON.parse(content) : undefined,
//     onEditorContentChange: (editor) => {
//       const newContent = JSON.stringify(editor.topLevelBlocks);
//       setContent(newContent);
//       debouncedSaveContent(newContent);
//     }
//   });

//   useEffect(() => {
//     const fetchNoteContent = async () => {
//       try {
//         const response = await fetch('/api/getNoteContent', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ noteId, workspaceId }),
//         });
//         const data = await response.json();
//         if (data[0] && data[0].content) {
//           setContent(data[0].content);
//         }
//       } catch (error) {
//         console.error('Error fetching note content:', error);
//       }
//     };

//     if (noteId && workspaceId) {
//       fetchNoteContent();
//     }
//   }, [noteId, workspaceId]);

//   return (
//     <div>
//       <BlockNoteView editor={editor} theme="light" />
//     </div>
//   );
// };

