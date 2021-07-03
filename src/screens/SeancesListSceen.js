import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getSeances } from '../actions/userActions';
import { deleteSeance } from '../actions/reponsableActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const SeancesListSceen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const listSeances = useSelector((state) => state.listSeances);
  const {
    Loading,
    seances,
    error,
    totalPages,
    itemsCountPerPage,
    totalItemsCount,
  } = listSeances;
  const removeSeance = useSelector((state) => state.removeSeance);
  const { Loading: LoadingDelete, successDelete, errorDelete } = removeSeance;
  const pageNumber = match.params.pageNumber || 0;
  useEffect(() => {
    if (userInfo && userInfo.user.role === 'responsable') {
      dispatch(getSeances(parseInt(pageNumber)));
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);
  //add pageNumber and successDelete
  const deleteSeancesHandler = (id) => {
    if (window.confirm('are you sure')) {
      dispatch(deleteSeance(id));
    }
  };
  return (
    <Container>
      <h2 className='my-2 py-2'>Seances List</h2>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='sm' responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>COURSE</th>
              <th>DAY</th>
              <th>COACH</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {seances.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.heureDebut}</td>
                <td>{item.heureFin}</td>
                <td>{item.cours.nomCours}</td>
                <td>{item.jour.nomJour}</td>
                <td>{`${item.coach.profil.prenom} ${item.coach.profil.nom}`}</td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm mx-3'
                    onClick={() => deleteSeancesHandler(item.id)}
                  >
                    <i className='fas fa-trash-alt'></i>
                  </Button>

                  <LinkContainer to={`/responsable/seance/${item.id}`}>
                    <Button variant='primary' className='btn-sm'>
                      <i className='fas fa-edit'></i>
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
        list='seances'
        role='responsable'
      />
    </Container>
  );
};

export default SeancesListSceen;
