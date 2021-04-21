import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getClients, deleteClient } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ClientsListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const clientsList = useSelector((state) => state.clientsList);
  const { Loading, clients, error } = clientsList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientDelete = useSelector((state) => state.clientDelete);
  const { Loading: LoadingDelete, successDelete, errorDelete } = clientDelete;
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getClients());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, successDelete, userInfo]);
  const deleteClientHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteClient(id));
    }
  };
  return (
    <>
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
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      {/* <i className='fas fa-edit'></i> */}
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteClientHandler(user.id)}
                    style={{ marginLeft: '30px' }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ClientsListScreen;
