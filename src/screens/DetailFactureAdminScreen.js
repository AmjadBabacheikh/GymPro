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
  Card,
  ListGroup,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getFactureDetailAdmin } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const DetailFactureAdminScreen = ({ history, match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const detailFactureAdmin = useSelector((state) => state.detailFactureAdmin);
  const { Loading, facture, error } = detailFactureAdmin;
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getFactureDetailAdmin(parseInt(id)));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  //   const submitCreateHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(addCoupon(reference, remise));
  //     setRemise('');
  //     setReference('');
  //   };
  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Card style={{ width: '100%', marginTop: 10, paddingLeft: 10 }}>
          <Card.Body>
            <Row>
              <Col>
                <h3 style={{ float: 'left' }} className='my-1 py-2'>
                  Detail Invoice N:{id}
                </h3>
              </Col>
              <Col>
                <h4 style={{ float: 'right' }} className='my-1 py-2'>
                  {facture?.facture?.date.slice(0, 10)}
                </h4>
              </Col>
            </Row>
            <h4>
              Customer :{' '}
              {facture?.client?.profil?.nom +
                ' ' +
                facture?.client?.profil?.prenom}
            </h4>
            <h5 className='my-3'>Products:</h5>
            <ListGroup>
              {facture?.services?.map((service) => (
                <ListGroup.Item style={{ color: '#EE6F57' }} key={service?.id}>
                  {service?.description + ' / ' + service?.prix + ' DH'}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h5 className='my-3'>Total : {facture?.facture?.montant} DH</h5>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default DetailFactureAdminScreen;
