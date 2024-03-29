import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  Table,
} from 'react-bootstrap';
import { getAllSeances } from '../actions/userActions';
import './CoursesScreen.css';
import img from '../images/class-details.jpg';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ClassesScreen = ({ history }) => {
  const dispatch = useDispatch();
  const listSeancesUser = useSelector((state) => state.listSeancesUser);
  const { Loading, seances, error } = listSeancesUser;
  const coursList = useSelector((state) => state.coursList);
  const { Loading: LoadingCours, cours, error: errorCours } = coursList;
  useEffect(() => {
    dispatch(getAllSeances());
  }, [dispatch]);

  const getCours = (heureDebut, heureFin, nomJour) => {
    const existedSeance = seances.find(
      (seance) =>
        seance.heureDebut === heureDebut &&
        seance.heureFin === heureFin &&
        seance.jour.nomJour === nomJour
    );
    if (existedSeance) {
      return (
        existedSeance.cours.nomCours + ' / ' + existedSeance.coach.profil.nom
      );
    } else {
      return '';
    }
  };
  return (
    <>
      {Loading || LoadingCours ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='wrapper'>
          <div className='services'>
            <h2>CLASSES DETAIL</h2>
          </div>
          <Container className='courses'>
            <Row>
              <Col md={7} xs={12}>
                <Image
                  src={img}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  rounded
                  fluid
                />
              </Col>
              <Col md={3} xs={12} style={{ float: 'right' }}>
                <h3>CATEGORIES</h3>
                <ul>
                  {cours.map((item, index) => (
                    <li key={index}>{item.cours.nomCours}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row>
              <h3 className='my-4'>Classes timetable</h3>
              <Table
                striped
                bordered
                hover
                variant='dark'
                className='sm my-1'
                responsive
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>8.00am - 10.00am</td>
                    <td>{getCours(8, 10, 'lundi')}</td>
                    <td>{getCours(8, 10, 'mardi')}</td>
                    <td>{getCours(8, 10, 'mercredi')}</td>
                    <td>{getCours(8, 10, 'jeudi')}</td>
                    <td>{getCours(8, 10, 'vendredi')}</td>
                    <td>{getCours(8, 10, 'samedi')}</td>
                    <td>{getCours(8, 10, 'dimanche')}</td>
                  </tr>
                  <tr>
                    <td>10.00am - 12.00am</td>
                    <td>{getCours(10, 12, 'lundi')}</td>
                    <td>{getCours(10, 12, 'mardi')}</td>
                    <td>{getCours(10, 12, 'mercredi')}</td>
                    <td>{getCours(10, 12, 'jeudi')}</td>
                    <td>{getCours(10, 12, 'vendredi')}</td>
                    <td>{getCours(10, 12, 'samedi')}</td>
                    <td>{getCours(10, 12, 'dimanche')}</td>
                  </tr>
                  <tr>
                    <td>5.00pm - 7.00pm</td>
                    <td>{getCours(17, 19, 'lundi')}</td>
                    <td>{getCours(17, 19, 'mardi')}</td>
                    <td>{getCours(17, 19, 'mercredi')}</td>
                    <td>{getCours(17, 19, 'jeudi')}</td>
                    <td>{getCours(17, 19, 'vendredi')}</td>
                    <td>{getCours(17, 19, 'samedi')}</td>
                    <td>{getCours(17, 19, 'dimanche')}</td>
                  </tr>
                  <tr>
                    <td>7.00pm - 9.00pm</td>
                    <td>{getCours(19, 21, 'lundi')}</td>
                    <td>{getCours(19, 21, 'mardi')}</td>
                    <td>{getCours(19, 21, 'mercredi')}</td>
                    <td>{getCours(19, 21, 'jeudi')}</td>
                    <td>{getCours(19, 21, 'vendredi')}</td>
                    <td>{getCours(19, 21, 'samedi')}</td>
                    <td>{getCours(19, 21, 'dimanche')}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default ClassesScreen;
