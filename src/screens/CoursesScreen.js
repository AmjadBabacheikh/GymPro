import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Row, Col, Container, Card } from 'react-bootstrap';
import { getListCours } from '../actions/coursActions';
import { base64StringToBlob } from 'blob-util';
import './CoursesScreen.css';
import img from '../images/01.jpg';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CoursesScreen = () => {
  const dispatch = useDispatch();
  const coursList = useSelector((state) => state.coursList);
  const { Loading, cours, error } = coursList;
  useEffect(() => {
    dispatch(getListCours());
  }, []);
  const convertToImage = (response) => {
    var contentType = 'image/png';
    const blob = base64StringToBlob(response, contentType);
    var blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='wrapper'>
          <div className='services'>
            <h2>Services</h2>
          </div>
          <Container className='courses'>
            <h4>WHAT WE DO?</h4>
            <h3>PUSH YOUR LIMITS FORWARD</h3>
            <Row>
              {cours.map((item, index) => (
                <Col key={index} xs={12} md={6} lg={4} xl={3}>
                  <Card
                    style={{
                      width: '16rem',
                      height: '20.4rem',
                    }}
                    className='rounded mx-sm-auto'
                    key={index}
                  >
                    <Card.Img
                      variant='top'
                      src={convertToImage(item.imgBytes)}
                      style={{
                        height: '250px',
                        width: '100%',
                      }}
                      // rounded
                      // fluid
                    />
                    <Card.Body>
                      <Card.Title
                        as='h5'
                        style={{
                          fontSize: '14px',
                          color: '#121212',
                          // height: '3rem',
                          textAlign: 'center',
                        }}
                      >
                        <strong>{item.cours.nomCours}</strong>
                      </Card.Title>
                      <Card.Text
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        {item.cours.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default CoursesScreen;
