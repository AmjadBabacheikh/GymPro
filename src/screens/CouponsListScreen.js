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
import {
  getResponsables,
  deleteEmploye,
  addResponsable,
} from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const CouponsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [remise, setRemise] = useState('');
  const [reference, setReference] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const couponAdd = useSelector((state) => state.couponAdd);
  const { Loading, successAdd, errorAdd } = couponAdd;
  //   const pageNumber = match.params.pageNumber || 0;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'responsable') {
      dispatch(getCoupons());
    } else if (successAdd) {
      setShow(false);
      dispatch(getResponsables());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successAdd]);

  const submitCreateHandler = (e) => {
    e.preventDefault();

    e.preventDefault();
    dispatch(addCoupon(reference, remise));
    setRemise('');
    setReference('');
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3 className='my-1 py-2'>Responsables List </h3>
        </Col>
        <Col>
          <Button
            className='my-3 btn-sm py-1'
            onClick={handleShow}
            style={{ float: 'right' }}
          >
            Nouveau Responsable
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
              <th>CIN</th>
              <th> Name</th>
              <th>EMAIL</th>
              <th>ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {responsables.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.profil.cin}</td>
                <td>{`${user.profil.prenom} ${user.profil.nom}`}</td>
                <td>{user.email}</td>

                <td>
                  {/* <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className="fas fa-eye"></i>
                    </Button>
                  </LinkContainer> */}

                  {!user.banned ? (
                    <Button
                      variant='danger'
                      className='btn-sm mx-4'
                      onClick={() => deleteEmployeHandler(user.id)}
                    >
                      <i className='fas fa-user-minus'></i>
                    </Button>
                  ) : (
                    <Button
                      variant='success'
                      className='btn-sm mx-4'
                      onClick={() => deleteEmployeHandler(user.id)}
                    >
                      <i class='fas fa-user-plus'></i>
                    </Button>
                  )}
                  <LinkContainer to={`/admin/employe/${user.id}/edit`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fas fa-eye'></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Responsable</Modal.Title>
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
      {/* <Paginate
        page={totalItemsCount}
        pages={totalPages}
        isAdmin={true}
        list='responsablelist'
      /> */}
    </Container>
  );
};

export default CouponsListScreen;
