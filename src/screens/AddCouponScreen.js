import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { addCoupon } from '../actions/reponsableActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';

const AddCouponScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [remise, setRemise] = useState('');
  const [reference, setReference] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const couponAdd = useSelector((state) => state.couponAdd);
  const { Loading, successAdd, errorAdd } = couponAdd;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addCoupon(reference, remise));
    setRemise('');
    setReference('');
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Ajouter Coupon
      </h1>
      {Loading && <Loader />}
      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {successAdd && (
        <Message variant='success'>Course ajoute avec succes</Message>
      )}
      <Form onSubmit={handleAdd}>
        <Form.Group controlId='reference'>
          <Form.Label>reference</Form.Label>
          <Form.Control
            type='text'
            placeholder='entrer reference'
            value={reference}
            onChange={(e) => {
              setReference(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId='reference'>
          <Form.Label>reference</Form.Label>
          <Form.Control
            type='number'
            placeholder='entrer remise'
            value={remise}
            onChange={(e) => {
              setRemise(e.target.value);
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

export default AddCouponScreen;
