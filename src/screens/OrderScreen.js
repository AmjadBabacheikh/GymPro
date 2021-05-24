import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Image, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCart } from '../actions/userActions';
import Message from '../components/Loader';
import Loader from '../components/Loader';

const OrderScreen = ({ match }) => {
  const [isSdk, setSdk] = useState(false);
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { Loading, cart, error } = userCart;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (isEmpty(cart)) {
      dispatch(getCart());
    }
  }, [dispatch]);
  const successPaymentHandler = (paymentResult) => {
    // dispatch(payOrder(orderId, paymentResult));
  };
  return (
    <Container>
      {error && <Message variant='info'>{error}</Message>}
      {Loading && <Loader />}
      {!isEmpty(cart) ? (
        <Container>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 style={{ color: '#121212' }}>Payment</h3>
                  <h6>
                    Name : {userInfo.user.profil.nom}
                    {userInfo.user.profil.prenom}
                  </h6>
                  <h6>Email : {userInfo.user.email}</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  {cart.services.length === 0 ? (
                    <Message variant='info'>Your cart is empty </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart.services.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <Image
                                src={item.image}
                                alt={item.description}
                                rounded
                                fluid
                              />
                            </Col>
                            <Col>
                              <Link
                                to={`/services/${item.id}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                              >
                                {item.description}
                              </Link>
                            </Col>
                            <Col md={4}>{item.prix} DH</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} className='my-4'>
              <ListGroup>
                <ListGroup.Item>
                  <h2 style={{ color: '#121212' }}>ORDER SUMMARY</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.services.length}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      {cart.services
                        .reduce((acc, item) => acc + item.prix, 0)
                        .toFixed(2)}
                      <span> </span>
                      DH
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && ( */}
                <ListGroup.Item>
                  <PayPalButton
                    amount={cart.services
                      .reduce((acc, item) => acc + item.prix, 0)
                      .toFixed(2)}
                    onSuccess={successPaymentHandler}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1> </h1>
      )}
    </Container>
  );
};

export default OrderScreen;