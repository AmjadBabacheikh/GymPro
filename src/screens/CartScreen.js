import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base64StringToBlob } from 'blob-util';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';
import { getCart, removeItemFromCart } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const userCart = useSelector((state) => state.userCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { Loading, cart, error } = userCart;
  const clientRemoveItem = useSelector((state) => state.clientRemoveItem);
  const {
    Loading: LoadingDelete,
    successDelete,
    errorDelete,
  } = clientRemoveItem;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, successDelete]);

  const removeFromCartHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(removeItemFromCart(id));
    }
  };
  const checkCouponHandler = () => {};
  const checkoutHandler = () => {
    // if (userInfo) {
    //   history.push('/shipping');
    // } else {
    //   history.push('/login');
    // }
    history.push('/payment');
  };
  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };
  return (
    <Container className='my-3'>
      <h2 className='mx-3'>Shopping Cart</h2>
      {error && <Message variant='info'>{error}</Message>}
      {Loading && <Loader />}

      {!isEmpty(cart) ? (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              {cart.achatDetails.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={convertToImage(item.service.imgBytes)}
                        alt={item.service.service.description}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
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
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() =>
                          removeFromCartHandler(item.service.service.id)
                        }
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    total (
                    {cart.achatDetails
                      .reduce((acc, item) => acc + item.qte, 0)
                      .toFixed(0)}
                    ) items
                  </h2>
                  {cart.achatDetails
                    .reduce(
                      (acc, item) => acc + item.service.service.prix * item.qte,
                      0
                    )
                    .toFixed(2)}
                  <span> </span>
                  DH
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.achatDetails.length === 0}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form>
                    <Row>
                      <Col md={9}>
                        <Form.Group controlId='coupon'>
                          <Form.Control
                            type='text'
                            placeholder='Entrer coupon'
                            value={coupon}
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
                          disabled={cart.achatDetails.length === 0}
                          onClick={checkCouponHandler}
                        >
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <h1></h1>
      )}
    </Container>
  );
};

export default CartScreen;
