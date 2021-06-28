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
import { getClientFacture } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const FacturesClientsScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientListFactures = useSelector((state) => state.clientListFactures);
  const {
    Loading,
    factures,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = clientListFactures;
  const pageNumber = match.params.pageNumber || 0;
  useEffect(() => {
    if (userInfo) {
      dispatch(getClientFacture(parseInt(pageNumber)));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, pageNumber]);
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
          <h3 className='my-1 py-2'>Factures List </h3>
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
              <th> DATE</th>
              <th>MONTANT</th>

              <th>ITEMS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {factures.map((facture) => (
              <tr key={facture.id}>
                <td>{facture.id}</td>
                <td>
                  {!isEmpty(facture.facture) &&
                    facture.facture.date.slice(0, 10) +
                      '   ' +
                      facture.facture.date.slice(11, 19)}
                </td>
                <td>{facture.facture.montant}</td>
                <td>{facture.services.length}</td>
                <td>
                  <LinkContainer to={`/client/facture/${facture.id}`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fas fa-eye'></i>
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate
        page={totalItemsCount}
        pages={totalPages}
        isAdmin={true}
        list='factures'
        role='client'
      />
    </Container>
  );
};

export default FacturesClientsScreen;
