import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addAbonnement } from '../actions/reponsableActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';

const AddAbonnementScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [durée, setDuree] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const abonnementAdd = useSelector((state) => state.abonnementAdd);
  const { Loading, successAdd, errorAdd } = abonnementAdd;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleInscription = (e) => {
    e.preventDefault();
    dispatch(addAbonnement(prix, description, parseInt(durée), image));
    setDescription('');
    setDuree(0);
    setPrix(0.0);
    setImage('');
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Ajouter Abonnement
      </h1>
      {Loading && <Loader />}
      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {successAdd && (
        <Message variant='success'>Abonnement ajoute avec succes</Message>
      )}
      <Form onSubmit={handleInscription}>
        <Form.Group controlId='description'>
          <Form.Label>description</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId='Prix'>
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={prix}
            onChange={(e) => {
              setPrix(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId='Duree'>
          <Form.Label>Duree</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={durée}
            onChange={(e) => {
              setDuree(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>image</Form.Label>
          <Form.Control
            type=''
            placeholder=''
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
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

export default AddAbonnementScreen;
