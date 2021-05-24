import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getClients, deleteClient } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const ClientsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const clientsList = useSelector((state) => state.clientsList);
  const {
    Loading,
    clients,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = clientsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientDelete = useSelector((state) => state.clientDelete);
  const { Loading: LoadingDelete, successDelete, errorDelete } = clientDelete;
  const pageNumber = match.params.pageNumber || 0;
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getClients(parseInt(pageNumber)));
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber]);
  const deleteClientHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteClient(id));
    }
  };
  return (
    <Container>
      <h2 className='my-2 py-2'>Clients List</h2>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.profil.cin}</td>
                <td>{`${user.profil.prenom} ${user.profil.nom}`}</td>
                <td>{user.email}</td>
                <td>
                  {!user.banned ? (
                    <Button
                      variant='danger'
                      className='btn-sm mx-3'
                      onClick={() => deleteClientHandler(user.id)}
                    >
                      <i className='fas fa-user-minus'></i>
                    </Button>
                  ) : (
                    <Button
                      variant='success'
                      className='btn-sm mx-3'
                      onClick={() => deleteClientHandler(user.id)}
                    >
                      <i class='fas fa-user-plus'></i>
                    </Button>
                  )}
                  <LinkContainer to={`/admin/client/${user.id}/edit`}>
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
        list='clientslist'
      />
    </Container>
  );
};

export default ClientsListScreen;
