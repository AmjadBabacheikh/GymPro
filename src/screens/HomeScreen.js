import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import homeImage from '../images/8225.jpg';
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
          <Image className='homeContainer' src={homeImage} alt='home image' />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='text-center py-4'>
            <h4 className='homeh4'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam cum cumque modi sint, labore molestias similique vel,
              quaerat quidem unde libero dolor eos ad, iusto commodi. Unde neque
              sed magni.
            </h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
