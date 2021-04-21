import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Button, ListGroup } from 'react-bootstrap';
import { getMyProfile, getMyImage } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Loader';
import Loader from '../components/Loader';
import unknown from '../images/unknown.jpg';
import './ProfileUserScreen.css';
import axios from 'axios';

const ProfileUserScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [uploadingImage, setUploadingImage] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { Loading: LoadingProfile, user, error: errorProfile } = userProfile;
  const userImage = useSelector((state) => state.userImage);
  const { Loading: LoadingImage, image, error: errorImage } = userImage;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(getMyProfile());
      dispatch(getMyImage());
    }
  }, [dispatch, history]);

  const uploadImageHandler = async (e) => {
    // const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append('file', file);
    // setUploadingImage(true);
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `${userInfo.jwt}`,
    //     },
    //   };
    //   await axios.post('/api/CANDIDAT/pdp', formData, config);
    //   setUploadingImage(false);
    //   dispatch(getMyImage());
    // } catch (error) {
    //   console.error(error);
    //   setUploadingImage(false);
    // }
  };

  return (
    <>
      <LinkContainer to='/editProfile' style={{ float: 'right' }}>
        <Button variant='secondary' className='my-3'>
          Edit Profile
        </Button>
      </LinkContainer>
      {LoadingProfile ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3} xs={12} className='my-3 profile-img'>
            {image ? (
              <>
                <img
                  alt={user.firstName}
                  style={{ width: '80%', height: '80%' }}
                  src={image}
                />
                <div className='file btn btn-lg btn-primary'>
                  Change Photo
                  <input
                    type='file'
                    name='file'
                    onChange={uploadImageHandler}
                  />
                  {uploadingImage && <Loader />}
                </div>
              </>
            ) : (
              <>
                <img
                  alt={user.prenom}
                  style={{ width: '80%', height: '70%' }}
                  src={unknown}
                />
                <div className='file btn btn-lg btn-primary'>
                  Change Photo
                  <input
                    type='file'
                    name='file'
                    onChange={uploadImageHandler}
                  />
                  {uploadingImage && <Loader />}
                </div>
              </>
            )}
          </Col>
          <Col md={9} xs={12} className='my-3'>
            <h4 style={{ marginBottom: '20px', color: '#333' }}>
              {!isEmpty(user) ? user.nom.toUpperCase() : null}
              <span> </span>
              {!isEmpty(user) ? user.prenom.toUpperCase() : null}
            </h4>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>CIN</Col>
                  <Col className='info'>
                    <strong>{user.cin}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Name</Col>
                  <Col className='info'>
                    <strong>
                      {user.nom} {user.prenom}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phone</Col>
                  <Col className='info'>
                    <strong>{user.telephone}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Genre</Col>
                  <Col className='info'>
                    <strong>{user.genre}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Date Naissance</Col>
                  <Col className='info'>
                    <strong>
                      {user.dateNaissance
                        ? user.dateNaissance.slice(0, 10)
                        : null}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileUserScreen;
