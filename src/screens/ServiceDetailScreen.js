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
import { base64StringToBlob } from 'blob-util';

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
  }, [dispatch, serviceId, success]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (cart.achatDetails) {
    //   // const found = cart.services.some((el) => el.id === serviceId);
    //   // if (found) {
    //   //   setMessage('ce service existe deja dans votre carte');
    //   // } else {
    //   // if (cart.achatDetails && cart.achatDetails !== []) {
    //   //   dispatch(createCart([{ service.service, qte: 1 }, ...cart.achatDetails]));

    //   // } else {
    //   //   dispatch(createCart([{ service.service, qte: 1 }]));
    //   // }
    //   // }
    //   dispatch(createCart([item]));
    // }
    dispatch(createCart(serviceId, 1));
  };
  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
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
        <Card>
          {!isEmpty(service) && (
            <Container className='my-4'>
              <Row>
                <Col md={6} xs={12}>
                  <Image
                    alt={service.service.description}
                    src={convertToImage(service.imgBytes)}
                    thumbnail
                    fluid
                    className='px-2'
                  />
                </Col>
                <Col md={6} xs={12} className='my-4'>
                  <Row>
                    <h3 className='py-2' style={{ color: '#121212' }}>
                      {service.service.description}
                    </h3>
                  </Row>
                  <Row>
                    <h2 className='py-2' style={{ color: '#666' }}>
                      <span style={{ color: '#ee6f57', fontWeight: 'bold' }}>
                        {service.service.prix}
                      </span>
                      MAD {service.service.duree} months
                    </h2>
                    <h4 className='py-2'>
                      commitment {service.service.duree} months
                    </h4>
                    <h5 className='py-2' style={{ color: '#666' }}>
                      INCLUDED MANY ADVANTAGES IN YOUR PACK
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
                        Buy now
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
        </Card>
      )}
    </Container>
  );
};

export default ServiceDetailScreen;
