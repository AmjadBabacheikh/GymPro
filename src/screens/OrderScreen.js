import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  ListGroup,
  Row,
  Col,
  Image,
  Button,
  Container,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCart, reglerAchat, checkCoupon } from '../actions/userActions';
import {
  CHECK_COUPON_RESET,
  REGLER_ACHAT_RESET,
} from '../constants/userConstants';
import Message from '../components/Loader';
import Loader from '../components/Loader';
import { base64StringToBlob } from 'blob-util';

const OrderScreen = ({ match, history }) => {
  const [isSdk, setSdk] = useState(false);
  const dispatch = useDispatch();
  const [theCoupon, setCoupon] = useState('');
  const userCart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const couponCheck = useSelector((state) => state.couponCheck);
  const { Loading: LoadingCoupon, coupon, error: errorCoupon } = couponCheck;
  const { userInfo } = userLogin;
  const achatRegle = useSelector((state) => state.achatRegle);
  const { successPay, errorPay, LoadingPay } = achatRegle;
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
    if (isEmpty(cart)) {
      dispatch(getCart());
    }
    if (successPay) {
      dispatch({ type: REGLER_ACHAT_RESET });
      history.push('/client/factures');
    }
    if (!isEmpty(coupon)) {
      dispatch({ type: CHECK_COUPON_RESET });
    } else {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch, successPay]);
  const checkCouponHandler = async (e) => {
    console.log(theCoupon);
    e.preventDefault();
    dispatch(checkCoupon(theCoupon));
    // try {
    //   const { data } = await axios.get(
    //     `/api/client/coupons`,
    //     { reference: theCoupon },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `${userInfo.jwt}`,
    //       },
    //     }
    //   );
    //   console.log(data);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };
  const successPaymentHandler = () => {
    dispatch(reglerAchat(coupon.id));
  };
  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };
  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : !isEmpty(cart) ? (
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
                  {/* {successPay && (
                    <Message variant='success'>Paid successfully</Message>
                  )} */}
                </ListGroup.Item>
                <ListGroup.Item>
                  {cart?.achatDetails?.length === 0 ? (
                    <Message variant='info'>Your cart is empty </Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {cart?.achatDetails?.map((item, index) => (
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
                      {cart?.achatDetails
                        .reduce((acc, item) => acc + item.qte, 0)
                        .toFixed(0)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      {!isEmpty(coupon)
                        ? cart?.achatDetails
                            .reduce(
                              (acc, item) =>
                                acc + item.service.service.prix * item.qte,
                              0
                            )
                            .toFixed(2) -
                          cart?.achatDetails
                            .reduce(
                              (acc, item) =>
                                acc + item.service.service.prix * item.qte,
                              0
                            )
                            .toFixed(2) *
                            coupon.remise
                        : cart?.achatDetails
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
                <ListGroup.Item>
                  <Form>
                    <Row>
                      <Col md={9}>
                        <Form.Group controlId='coupon'>
                          <Form.Control
                            type='text'
                            placeholder='Entrer coupon'
                            value={theCoupon}
                            onChange={(e) => {
                              setCoupon(e.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button
                          type='button'
                          // className='btn-sm'
                          disabled={cart?.achatDetails?.length === 0}
                          onClick={checkCouponHandler}
                        >
                          Apply
                        </Button>
                      </Col>
                      <h5 className='px-3' style={{ color: 'red' }}>
                        {errorCoupon ===
                          'Request failed with status code 404' &&
                          'wrong coupon'}
                      </h5>
                    </Row>
                  </Form>
                  <Row>
                    {/* {errorCoupon && (
                      <Message variant='danger'>{errorCoupon}</Message>
                    )} */}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {LoadingPay && <Loader />}
                  {!isSdk ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={
                        !isEmpty(coupon)
                          ? cart?.achatDetails
                              .reduce(
                                (acc, item) =>
                                  acc + item.service.service.prix * item.qte,
                                0
                              )
                              .toFixed(2) -
                            cart?.achatDetails
                              .reduce(
                                (acc, item) =>
                                  acc + item.service.service.prix * item.qte,
                                0
                              )
                              .toFixed(2) *
                              coupon.remise
                          : cart?.achatDetails
                              .reduce(
                                (acc, item) =>
                                  acc + item.service.service.prix * item.qte,
                                0
                              )
                              .toFixed(2)
                      }
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1></h1>
      )}
    </Container>
  );
};

export default OrderScreen;
