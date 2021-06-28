import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import ServicesCarousel from '../components/ServicesCarousel';
import './HomeScreen.css';

const HomeScreen = ({ history }) => {
  return (
    <Container className='homeContent' style={{ minHeight: '40vh' }}>
      <Row>
        <Col md={5} xs={12}>
          <h1
            className='py-5 my-5'
            style={{
              fontFamily: 'Montserrat',
              fontSize: '45px',
              fontWeight: 'bold',
            }}
          >
            SHAPE YOUR BODY <br /> BE <span className='strong'>STRONG</span>{' '}
            <br /> TRAINING HARD <br />
          </h1>
        </Col>
        <Col md={7} lg={5} xs={12}>
          <Image
            className='homeContainer'
            src={'./images/8225-min.jpg'}
            alt='home image'
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='text-center py-4'>
            <h3 className='homeh4'>
              <strong
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                }}
              >
                TOP OF THE RANGE SPORTS HALL
              </strong>
            </h3>
            <h4>
              BODYBUILDING, CARDIO, CROSS-TRAINING & BOXING WITH UNLIMITED
              ACCESS
            </h4>
          </div>
        </Col>
      </Row>
      <ServicesCarousel />
    </Container>
  );
};

export default HomeScreen;
