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
import { getCoachs, deleteEmploye, addCoach } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const CoachListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [CIN, setCin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateNaissance, setDateNaissance] = useState();
  const [genre, setGenre] = useState();
  const coachsList = useSelector((state) => state.coachsList);
  const {
    Loading,
    coachs,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = coachsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const employeDelete = useSelector((state) => state.employeDelete);
  const { Loading: LoadingDelete, successDelete, errorDelete } = employeDelete;
  const coachAdd = useSelector((state) => state.coachAdd);
  const pageNumber = match.params.pageNumber || 0;
  const {
    Loading: LoadingAddCoach,
    successAdd: successAddCoach,
    errorAdd: errorAddCoach,
  } = coachAdd;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getCoachs(parseInt(pageNumber)));
    } else if (successAddCoach) {
      handleClose();
      dispatch(getCoachs(parseInt(pageNumber)));
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, successDelete, userInfo, successAddCoach, pageNumber]);
  const deleteEmployeHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteEmploye(id));
    }
  };

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCoach(
        CIN,
        firstName,
        lastName,
        email,
        dateNaissance,
        genre,
        phoneNumber
      )
    );

    setCin('');
    setEmail('');
    setGenre('');
    setLastName('');
    setFirstName('');
    setPhoneNumber('');
    setDateNaissance();
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3 className='my-1 py-2'>Coach List </h3>
        </Col>
        <Col>
          <Button
            className='my-3 btn-sm py-1'
            onClick={handleShow}
            style={{ float: 'right' }}
          >
            Nouveau Coach
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
            {coachs.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.profil.cin}</td>
                <td>{`${user.profil.prenom} ${user.profil.nom}`}</td>
                <td>{user.email}</td>
                <td>
                  {/* <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer> */}
                  {!user.isBanned ? (
                    <Button
                      variant='danger'
                      className='btn-sm mx-3'
                      onClick={() => deleteEmployeHandler(user.id)}
                    >
                      <i className='fas fa-user-minus'></i>
                    </Button>
                  ) : (
                    <Button
                      variant='success'
                      className='btn-sm mx-3'
                      onClick={() => deleteEmployeHandler(user.id)}
                    >
                      <i class='fas fa-user-plus'></i>
                    </Button>
                  )}
                  <LinkContainer to={`/admin/employe/${user.id}`}>
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
              <Modal.Title>Add Coach</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {LoadingAddCoach && <Loader />}
              {errorAddCoach && (
                <Message variant='danger'>{errorAddCoach}</Message>
              )}
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId='firstName'>
                      <Form.Label>Your first name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='John'
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='lastName'>
                      <Form.Label>Your last name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Doe'
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId='cin'>
                  <Form.Label>Your cin</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='D4395713'
                    value={CIN}
                    onChange={(e) => {
                      setCin(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Your email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='e.g.elon@gmail.com'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='phoneNumber'>
                  <Form.Label>Your phone number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='+2120643562097'
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='gender' style={{ marginTop: '30px' }}>
                  <Row>
                    <Col>
                      <Form.Label>Your gender</Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='H'
                        name='formHorizontalRadios'
                        id='H'
                        onChange={(e) => {
                          setGenre('Homme');
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='F'
                        name='formHorizontalRadios'
                        id='F'
                        onChange={(e) => {
                          setGenre('Femme');
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='date'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type='date'
                    onChange={(e) => {
                      setDateNaissance(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
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
        list='coachlist'
        role='admin'
      />
    </Container>
  );
};

export default CoachListScreen;
