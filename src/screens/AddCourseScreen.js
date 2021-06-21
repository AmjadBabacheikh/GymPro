import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addCourse } from '../actions/coursActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import './SignUpScreen.css';

const AddCourseScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [nomCours, setNomCours] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const courseAdd = useSelector((state) => state.courseAdd);
  const { Loading, successAdd, errorAdd } = courseAdd;

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
        '/api/responsable/cours/image',
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

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addCourse(nomCours, description, img));
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Ajouter Course
      </h1>
      {Loading && <Loader />}
      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {successAdd && (
        <Message variant='success'>Course ajoute avec succes</Message>
      )}
      <Form onSubmit={handleAdd}>
        <Form.Group controlId='nom'>
          <Form.Label>Titre</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={nomCours}
            onChange={(e) => {
              setNomCours(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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

export default AddCourseScreen;
