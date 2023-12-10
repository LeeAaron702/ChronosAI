import React, { useEffect, useRef } from 'react';
import { useChat } from "ai/react";
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Chatbox = ({ workspaceId }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, {
      data: {
        workspaceId: workspaceId,
      },
    });
  };

  return (
    <Container className="d-flex flex-column p-0" style={{ height: '100%' }}>
      <Row className="flex-grow-1">
        <Col>
          <div className="overflow-auto"  ref={scrollRef}>
            <ListGroup variant="flush">
              {messages.map((message, index) => (
                   <ListGroup.Item key={index} 
                   className={`d-flex ${message.role === "assistant" ? "align-items-start" : "align-items-end"} flex-column`}
                   style={{ 
                     backgroundColor: message.role === "assistant" ? '#f0f0f0' : '#F3F3F3',
                     color: message.role === "assistant" ? 'black' : 'black', 
                     borderRadius: '15px', 
                     padding: '10px', 
                     margin: '5px',
                     alignSelf: message.role === "assistant" ? 'flex-start' : 'flex-end',
                     maxWidth: '80%', // Limiting the width of each bubble
                   }}
                 >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                     {message.role === "assistant" && <FontAwesomeIcon icon={faBrain} className="me-2" size="lg" />}
                     <span>{message.content}</span>
                     {message.role !== "assistant" && <FontAwesomeIcon icon={faUserCircle} className="ms-2" size="lg" />}
                   </div>
                 </ListGroup.Item>
               ))}
             </ListGroup>
             {isLoading && <div>Thinking...</div>}
             {error && <div>Something went wrong. Please try again.</div>}
           </div>
         </Col>
       </Row>
       <Row>
         <Col>
           <Form onSubmit={handleFormSubmit} className="d-flex align-items-center pb-2">
             <Form.Control
               type="text"
               placeholder="Type your message"
               value={input}
               onChange={handleInputChange}
               ref={inputRef}
               className="me-2"
               style={{ flexGrow: 1, borderColor: 'black' }} 
             />
             <Button variant="outline-dark" type="submit">Send</Button>
           </Form>
         </Col>
       </Row>
     </Container>
   );
 }
 
 export default Chatbox;