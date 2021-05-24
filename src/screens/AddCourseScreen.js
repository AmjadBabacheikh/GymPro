import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addCourse } from '../actions/coursActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';

const AddCourseScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [nomCours, setNomCours] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const courseAdd = useSelector((state) => state.courseAdd);
  const { Loading, successAdd, errorAdd } = courseAdd;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addCourse(nomCours));
    setNomCours('');
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
        <Form.Group controlId='description'>
          <Form.Label>description</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            value={nomCours}
            onChange={(e) => {
              setNomCours(e.target.value);
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

export default AddCourseScreen;
