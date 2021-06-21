import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Container,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getCoupons, addCoupon } from '../actions/reponsableActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const CouponsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [remise, setRemise] = useState('');
  const [reference, setReference] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const couponAdd = useSelector((state) => state.couponAdd);
  const { Loading: LoadingAdd, successAdd, errorAdd } = couponAdd;
  const couponsList = useSelector((state) => state.couponsList);
  const {
    Loading,
    coupons,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = couponsList;
  const pageNumber = match.params.pageNumber || 0;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'responsable') {
      dispatch(getCoupons(parseInt(pageNumber)));
    } else if (successAdd) {
      setShow(false);
      dispatch(getCoupons(parseInt(pageNumber)));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successAdd, pageNumber]);

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(addCoupon(reference, remise));
    setRemise('');
    setReference('');
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3 className='my-1 py-2'>Coupons List </h3>
        </Col>
        <Col>
          <Button
            className='my-3 btn-sm py-1'
            onClick={handleShow}
            style={{ float: 'right' }}
          >
            Nouveau Coupon
          </Button>
        </Col>
      </Row>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='sm' responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>REFERENCE</th>
              <th> REMISE</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.reference}</td>
                <td>{coupon.remise * 100} %</td>
              </tr>
            ))}
          </tbody>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Coupon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              <Form.Group controlId='remise'>
                <Form.Label>remise</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='entrer remise'
                  value={remise}
                  onChange={(e) => {
                    setRemise(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='primary' onClick={submitCreateHandler}>
                Create
              </Button>
              <Button className='mx-3' variant='light' onClick={handleClose}>
                Annuler
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
      )}
      <Paginate
        page={totalItemsCount}
        pages={totalPages}
        isAdmin={true}
        list='couponlist'
        role='responsable'
      />
    </Container>
  );
};

export default CouponsListScreen;
