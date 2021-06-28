import React from 'react';
import { ListGroup, Col, Row, Navbar, Card } from 'react-bootstrap';
const conversations = [
  {
    id: 1,
    title: 'fucking',
    lastMessage: ']gfdjgbfdjghfdgfdgg',
    timeLastMessage: '14:45',
  },
  {
    id: 2,
    title: 'fucking up ',
    lastMessage: ']gfdjgbfdjghfdgfdgg',
    timeLastMessage: '14:40',
  },
];

const messages = [
  { id: 1, content: 'fddssdfdsfdsd', sender: 'amjad' },
  { id: 2, content: 'fddssdfdsfdsd', sender: 'saad' },
  { id: 3, content: 'fddssdfdsfdsd', sender: 'amjad' },
  { id: 4, content: 'fddssdfdsfdsd', sender: 'saad' },
  { id: 5, content: 'fddssdfdsfdsd', sender: 'amjad' },
];
const ChatScreen = () => {
  return (
    <Row>
      <Col md={3}>
        <ListGroup variant='flush'>
          {conversations.map((item) => (
            <ListGroup.Item key={item.id} style={{ height: '5.5rem' }}>
              <Row>
                <Col>
                  <h5>{item.title}</h5>
                </Col>
                <Col>
                  <p style={{ float: 'right' }}>{item.timeLastMessage}</p>
                </Col>
              </Row>
              <p>{item.lastMessage}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col col={9}>
        <Navbar bg='dark' expand='lg'>
          <Navbar.Brand href='#home'>Fucking</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
        </Navbar>
        <div>
          {messages.map((item) => (
            <div key={item.id}>
              {item.sender === 'amjad' ? (
                <div
                  style={{
                    width: '18rem',
                    height: '2rem',
                    postion: 'absolute',
                    right: '3px',
                  }}
                >
                  <Card.Title className='mx-1'>{item.content}</Card.Title>
                </div>
              ) : (
                <Card
                  className='my-1'
                  style={{
                    width: '18rem',
                    height: '2rem',
                    postion: 'absolute',
                    right: 29,
                  }}
                >
                  <Card.Title className='mx-1'>{item.content}</Card.Title>
                </Card>
              )}
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default ChatScreen;
