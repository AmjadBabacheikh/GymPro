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
      <Row>
        <Col>
          <h3 className='my-1 py-2'>Facture Detail N:{id} </h3>
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
              <th>DATE</th>
              <th>CLIENT</th>
              <th>MONTANT</th>
              <th>ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(facture.facture) && (
              <tr key={facture.id}>
                <td>{facture.id}</td>
                <td>
                  {!isEmpty(facture.facture) &&
                    facture.facture.date.slice(0, 10) +
                      '   ' +
                      facture.facture.date.slice(11, 19)}
                </td>
                <td>
                  {facture.client.profil.nom} {facture.client.profil.prenom}
                </td>
                <td>{facture.facture.montant}</td>
                <td>{facture.services.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DetailFactureAdminScreen;
