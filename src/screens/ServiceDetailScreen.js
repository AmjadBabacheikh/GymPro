import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  ListGroup,
  Button,
  Image,
  Container,
  Card,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { getServicesDetail } from '../actions/coursActions';
import { createCart, getCart } from '../actions/userActions';
import { CREATE_CART_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';

const ServiceDetailScreen = ({ match, history }) => {
  const serviceId = match.params.id;
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const { cart } = userCart;
  const serviceDetail = useSelector((state) => state.serviceDetail);
  const { Loading, service, error } = serviceDetail;
  const addCart = useSelector((state) => state.addCart);
  const { Loading: LoadingAdd, success, error: errorAdd } = addCart;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_CART_RESET });
      history.push('/cart');
    } else dispatch(getCart());
    if (isEmpty(service) || service.id !== serviceId) {
      dispatch(getServicesDetail(serviceId));
    }
  }, [dispatch, serviceId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.services) {
      // const found = cart.services.some((el) => el.id === serviceId);
      // if (found) {
      //   setMessage('ce service existe deja dans votre carte');
      // } else {
      if (cart.services && cart.services !== []) {
        dispatch(createCart([service, ...cart.services]));
      } else {
        dispatch(createCart([service]));
      }
      // }
    }
  };
  return (
    <Container>
      <LinkContainer to='/' className='mx-3'>
        <Button variant='secondary' className='my-3'>
          Retour
        </Button>
      </LinkContainer>
      {LoadingAdd && <Loader />}
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Container className='my-4'>
          <Row>
            <Col md={6} xs={12}>
              <Image
                alt={service.description}
                src={service.image}
                thumbnail
                fluid
              />
            </Col>
            <Col md={6} xs={12} className='my-4'>
              <Row>
                <h3 style={{ color: '#121212' }}>{service.description}</h3>
              </Row>
              <Row>
                <h2 style={{ color: '#666' }}>
                  <span style={{ color: '#ee6f57', fontWeight: 'bold' }}>
                    {service.prix}
                  </span>
                  MAD pendant {service.duree} mois
                </h2>
                <h4>Engagement {service.duree} mois</h4>
                <h5 style={{ color: '#666' }}>
                  INCLUS DANS VOTRE PACK AVANTAGES
                </h5>
              </Row>
              <Row>
                <Form onSubmit={handleSubmit}>
                  <Button
                    variant='primary'
                    type='submit'
                    className='my-2 btn-sm'
                    style={{ backgroundColor: '#ee6f57' }}
                  >
                    Je m'abonne
                  </Button>
                </Form>
              </Row>
              <Row>
                {message && <Message variant='danger'>{message}</Message>}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ServiceDetailScreen;
