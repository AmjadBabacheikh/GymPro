import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Image, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCart, reglerAchat } from '../actions/userActions';
import Message from '../components/Loader';
import Loader from '../components/Loader';
import { base64StringToBlob } from 'blob-util';

const OrderScreen = ({ match }) => {
  const [isSdk, setSdk] = useState(false);
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const achatRegle = useSelector((state) => state.achatRegle);
  const { Loading: LoadingPay, successPay, errorPay } = achatRegle;
  const { Loading, cart, error } = userCart;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get('/api/client/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    if (isEmpty(cart) || successPay) {
      dispatch(getCart());
    } else {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch]);
  const successPaymentHandler = () => {
    dispatch(reglerAchat());
  };
  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
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
                  {cart.achatDetails.length === 0 ? (
                    <Message variant='info'>Your cart is empty </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart.achatDetails.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <Image
                                src={convertToImage(item.service.imgBytes)}
                                alt={item.service.service.description}
                                rounded
                                fluid
                              />
                            </Col>
                            <Col>
                              <Link
                                to={`/services/${item.service.service.id}`}
                                style={{
                                  textDecoration: 'none',
                                  color: '#1f3c88',
                                  fontSize: 18,
                                }}
                              >
                                {item.service.service.description}
                              </Link>
                            </Col>
                            <Col md={2}>{item.service.service.prix} DH</Col>
                            <Col md={2}>× {item.qte}</Col>
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
                    <Col>
                      {cart.achatDetails
                        .reduce((acc, item) => acc + item.qte, 0)
                        .toFixed(0)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      {cart.achatDetails
                        .reduce(
                          (acc, item) =>
                            acc + item.service.service.prix * item.qte,
                          0
                        )
                        .toFixed(2)}
                      <span> </span>
                      DH
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && ( */}
                <ListGroup.Item>
                  {LoadingPay && <Loader />}
                  {!isSdk ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={cart.achatDetails
                        .reduce(
                          (acc, item) =>
                            acc + item.service.service.prix * item.qte,
                          0
                        )
                        .toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
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
