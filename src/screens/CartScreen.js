import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { getCart } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
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
    dispatch(getCart());
  }, [dispatch]);

  const removeFromCartHandler = (id) => {
    // dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // if (userInfo) {
    //   history.push('/shipping');
    // } else {
    //   history.push('/login');
    // }
    history.push('/payment');
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
              {cart.services.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3}>
                      <Image
                        src={item.image}
                        alt={item.description}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/services/${item.id}`}
                        style={{ textDecoration: 'none', color: '#000000' }}
                      >
                        {item.description}
                      </Link>
                    </Col>
                    <Col md={2}>{item.prix} DH</Col>

                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.id)}
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
                  <h2>total ({cart.services.length}) items</h2>
                  {cart.services
                    .reduce((acc, item) => acc + item.prix, 0)
                    .toFixed(2)}
                  <span> </span>
                  DH
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.services.length === 0}
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
                          disabled={cart.services.length === 0}
                          onClick={checkoutHandler}
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
