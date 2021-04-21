import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center my-4'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
