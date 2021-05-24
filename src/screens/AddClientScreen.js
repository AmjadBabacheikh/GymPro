import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addClient } from '../actions/userActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';

const AddClientScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [CIN, setCin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateNaissance, setDateNaissance] = useState();
  const [genre, setGenre] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientAdd = useSelector((state) => state.clientAdd);
  const { Loading, successAdd, errorAdd } = clientAdd;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleInscription = (e) => {
    e.preventDefault();
    dispatch(
      addClient(
        CIN,
        email,
        firstName,
        genre,
        dateNaissance,
        lastName,
        phoneNumber
      )
    );
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Ajouter Client
      </h1>
      {Loading && <Loader />}
      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {successAdd && (
        <Message variant='success'>client ajoute avec succes</Message>
      )}
      <Form onSubmit={handleInscription}>
        <Row>
          <Col>
            <Form.Group controlId='firstName'>
              <Form.Label>first name</Form.Label>
              <Form.Control
                type='text'
                placeholder='John'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='lastName'>
              <Form.Label>last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Doe'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='cin'>
          <Form.Label>cin</Form.Label>
          <Form.Control
            type='text'
            placeholder='D4395713'
            value={CIN}
            onChange={(e) => {
              setCin(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>email</Form.Label>
          <Form.Control
            type='email'
            placeholder='e.g.elon@gmail.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
          <Form.Label>Your phone number</Form.Label>
          <Form.Control
            type='text'
            placeholder='+2120643562097'
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='gender' style={{ marginTop: '30px' }}>
          <Row>
            <Col>
              <Form.Label>Your gender</Form.Label>
            </Col>
            <Col>
              <Form.Check
                type='radio'
                label='H'
                name='formHorizontalRadios'
                id='H'
                onChange={(e) => {
                  setGenre('Homme');
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type='radio'
                label='F'
                name='formHorizontalRadios'
                id='F'
                onChange={(e) => {
                  setGenre('Femme');
                }}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId='date'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            onChange={(e) => {
              setDateNaissance(e.target.value);
            }}
          />
        </Form.Group>
        <div className='my-4'>
          <Button
            variant='primary'
            type='submit'
            className='btnLogin my-3 px-4'
            block
          >
            Ajouter
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default AddClientScreen;
