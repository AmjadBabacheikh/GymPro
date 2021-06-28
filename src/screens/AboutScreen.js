import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import './AboutScreen.css';
import img1 from '../images/team/team-1.jpg';
import img2 from '../images/team/team-2.jpg';
import img3 from '../images/team/team-3.jpg';
import img4 from '../images/team/team-4.jpg';
const properties = [
  { id: 1, icon: 'fas fa-dumbbell fa-3x', title: 'Professional training plan' },
  { id: 2, icon: 'fab fa-nutritionix fa-3x', title: 'Healthy nutrition plan' },
  { id: 4, icon: 'fas fa-biking fa-3x', title: 'Modern equipment' },
  { id: 3, icon: 'fas fa-heartbeat fa-3x', title: 'Unique to your needs' },
];
const AboutScreen = () => {
  return (
    <div className='contain'>
      <div className='title'>
        <h2>ABOUT US</h2>
      </div>
      <Container className='about'>
        <h4>WHY CHOOSE US?</h4>
        <h3>PUSH YOUR LIMITS FORWARD</h3>
        <Row>
          {properties.map((item) => (
            <Col className='my-2 py-3' md={3} key={item.id}>
              <div style={{ textAlign: 'center' }}>
                <i style={{ color: '#ee6f57' }} className={item.icon}></i>
                <h5>{item.title}</h5>
              </div>
            </Col>
          ))}
        </Row>
        <h5 className='py-2'>TRAIN WITH EXPERTS</h5>
        <Row>
          <Col className='my-2 py-3' md={3}>
            <Card
              // style={{
              //   width: '16rem',
              //   height: '20.4rem',
              // }}
              className='rounded mx-sm-auto'
            >
              <Card.Img
                variant='top'
                src={img1}
                style={{
                  height: '250px',
                  width: '100%',
                }}
              />
            </Card>
          </Col>
          <Col className='my-2 py-3' md={3}>
            <Card
              // style={{
              //   width: '16rem',
              //   height: '20.4rem',
              // }}
              className='rounded mx-sm-auto'
            >
              <Card.Img
                variant='top'
                src={img2}
                style={{
                  height: '250px',
                  width: '100%',
                }}
              />
            </Card>
          </Col>
          <Col className='my-2 py-3' md={3}>
            <Card
              // style={{
              //   width: '16rem',
              //   height: '20.4rem',
              // }}
              className='rounded mx-sm-auto'
            >
              <Card.Img
                variant='top'
                src={img3}
                style={{
                  height: '250px',
                  width: '100%',
                }}
              />
            </Card>
          </Col>
          <Col className='my-2 py-3' md={3}>
            <Card
              // style={{
              //   width: '16rem',
              //   height: '20.4rem',
              // }}
              className='rounded mx-sm-auto'
            >
              <Card.Img
                variant='top'
                src={img4}
                style={{
                  height: '250px',
                  width: '100%',
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutScreen;
