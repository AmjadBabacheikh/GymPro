import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './SignInScreen.css';

const SignInScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormContainer>
        <h1 className='py-2 text-center' style={{ color: ' #ee6f57' }}>
          Sign In
        </h1>
        {Loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Your email</Form.Label>
            <Form.Control
              type='email'
              placeholder='e.g.elon@gmail.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='your password here'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div>
            <Button
              variant='primary'
              type='submit'
              className='btnLogin my-3 px-4'
              block
            >
              Sign In
            </Button>
          </div>
        </Form>
        <Row className='py-3'>
          New Customer? ?
          <Link
            to='/register'
            style={{
              textDecoration: 'none',
              paddingLeft: '3px',
              color: '#005691',
            }}
          >
            Register
          </Link>
        </Row>
      </FormContainer>
    </div>
  );
};

export default SignInScreen;
