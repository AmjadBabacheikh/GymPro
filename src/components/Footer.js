import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footerContainer'>
      <Container>
        <Row>
          <Col md={12} lg={4}>
            <Row>
              <h1 className='px-2'>GymPro</h1>
            </Row>
            <Row>
              <p className='py-4 px-3'>
                Our goal is to support you to achieve your sporting goals, and
                to help you surpass yourself.
              </p>
            </Row>
          </Col>
          <Col md={12} lg={4}>
            <ul>
              <li className='py-0.5'>
                <h5>Address</h5>
                <p>23 AL FARAH,20070</p>
                <p>CASABLANCA-MAROC</p>
              </li>
              <li className='py-0.5'>
                <h5>Email</h5>
                <p>contact@gympro.com</p>
              </li>
              <li className='py-0.5'>
                <h5>Customer service</h5>
                <p>+212689432312 /+3376490293</p>
              </li>
            </ul>
          </Col>
          <Col md={12} lg={4}>
            <h4>Useful links</h4>
            <ul>
              <li className='py-2'>
                <Link to='/'>Home</Link>
              </li>
              <li className='py-2'>
                <Link to='/classes'>Classes</Link>
              </li>
              <li className='py-2'>
                <Link to='/about'>About</Link>
              </li>
            </ul>
            <h4>Follow us</h4>
            <ul>
              <li>
                <i className='fab fa-facebook fa-lg  py-3'></i>
                <i className='fab fa-linkedin fa-lg mx-3 py-3'></i>
                <i className='fab fa-instagram fa-lg py-3'></i>
                <i className='fab fa-twitter fa-lg mx-3 py-3'></i>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-2 my-1'>
            &copy; Copyright 2020 GymPro - All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
