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
            <h4 className='homeh4'>
              <h3>
                <strong
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}
                >
                  SALLE DE SPORT HAUT DE GAMME
                </strong>
              </h3>
              MUSCULATION, CARDIO, CROSS-TRAINING & BOXE EN ACCÈS ILLIMITÉ
            </h4>
          </div>
        </Col>
      </Row>
      <ServicesCarousel />
    </Container>
  );
};

export default HomeScreen;
