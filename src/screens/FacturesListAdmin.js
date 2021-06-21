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
import { getAllFactures } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const FacturesListAdmin = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientsListFacturesAdmin = useSelector(
    (state) => state.clientsListFacturesAdmin
  );
  const {
    Loading,
    factures,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = clientsListFacturesAdmin;
  const pageNumber = match.params.pageNumber || 0;
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllFactures(parseInt(pageNumber)));
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
              <th>DATE</th>
              <th>CLIENT</th>
              <th>MONTANT</th>
              <th>ITEMS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {factures.map(
              (facture) =>
                !isEmpty(facture.facture) && (
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
                    <td>
                      <LinkContainer to={`/admin/facture/${facture.id}`}>
                        <Button variant='primary' className='btn-sm'>
                          <i className='fas fa-eye'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
      {/*<Paginate
          page={totalItemsCount}
          pages={totalPages}
          isAdmin={true}
          list='couponlist'
          role='responsable'
        /> */}
    </Container>
  );
};

export default FacturesListAdmin;
