import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addAbonnement } from '../actions/reponsableActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';
import axios from 'axios';

const AddAbonnementScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [durée, setDuree] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [img, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const abonnementAdd = useSelector((state) => state.abonnementAdd);
  const { Loading, successAdd, errorAdd } = abonnementAdd;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${userInfo.jwt}`,
        },
      };

      const { data } = await axios.post(
        '/api/responsable/abonnement/image',
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const handleInscription = (e) => {
    e.preventDefault();
    dispatch(addAbonnement(prix, description, parseInt(durée), img));
    // setDescription('');
    // setDuree(0);
    // setPrix(0.0);
    // setImage('');
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
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image url'
            value={img}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.File
            id='image-file'
            label='Choose File'
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && <Loader />}
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
