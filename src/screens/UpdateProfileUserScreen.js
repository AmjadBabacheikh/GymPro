import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import {
  updateProfile,
  getMyProfile,
  updatePassword,
} from '../actions/userActions';
import {
  USER_UPDATE_PROFILE_RESET,
  USER_PROFILE_RESET,
} from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UpdateProfileUserScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [cin, setCin] = useState('');
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateNaissance, setDateNaissance] = useState();
  const [genre, setGenre] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [menCheked, setMenCheked] = useState(false);
  const [womenCheked, setWomenCheked] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { Loading: LoadingProfile, user, error: errorProfile } = userProfile;
  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { success } = profileUpdate;
  const passwordUpdate = useSelector((state) => state.passwordUpdate);
  const { passwordSuccess } = passwordUpdate;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(getMyProfile());
    } else if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: USER_PROFILE_RESET });
      history.push('/profile');
    } else if (passwordSuccess) {
      handleClose();
      setMessage('');
    } else {
      setFirstName(user.prenom);
      setLastName(user.nom);
      setPhoneNumber(user.telephone);
      setDateNaissance(user.dateNaissance.slice(0, 10));
      setCin(user.cin);
      if (user.genre == 'Homme') {
        setMenCheked(true);
      } else if (user.genre == 'Femme') {
        setWomenCheked(true);
      }
    }
  }, [dispatch, user, history, success, passwordSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // if (firstName == '' || lastName == '' || phoneNumber == '') {
    //   setMessage('Veuillez remplir tous les champs');
    // } else {
    dispatch(
      updateProfile(
        firstName,
        lastName,
        phoneNumber,
        dateNaissance,
        genre ? genre : user.genre,
        cin
      )
    );
    // }
  };
  const submitPasswordHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('passwords does not match');
    } else {
      dispatch(updatePassword(password));
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <Row>
      <Col md={6} className='my-3 px-3'>
        <h2>Edit Profile</h2>
        {success && (
          <Message variant='success'>profile updated successfully</Message>
        )}
        {LoadingProfile ? (
          <Loader />
        ) : errorProfile ? (
          <Message varaint='danger'>{errorProfile}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='cin'>
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type='text'
                placeholder='D4395713'
                value={cin}
                onChange={(e) => {
                  setCin(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='firstName'>
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                type='name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='tel'>
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type='text'
                value={phoneNumber || ''}
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
                value={dateNaissance || ''}
                onChange={(e) => {
                  setDateNaissance(e.target.value);
                }}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant='primary' type='submit'>
                  Update
                </Button>
              </Col>
              <Col>
                <Button variant='primary' onClick={handleShow}>
                  Modifier password
                </Button>
              </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {message && <Message variant='danger'>{message}</Message>}
                <Form>
                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='primary'
                  type='submit'
                  onClick={submitPasswordHandler}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default UpdateProfileUserScreen;
