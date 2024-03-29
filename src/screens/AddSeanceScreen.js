import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { getCoachsRespo, addSeance } from '../actions/reponsableActions';
import { getListCours } from '../actions/coursActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import './SignUpScreen.css';

const AddSeanceScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [idCoach, setCoach] = useState('');
  const [idCours, setCours] = useState('');
  const [idJour, setJour] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const coachsListRespo = useSelector((state) => state.coachsListRespo);
  const { Loading, coachs, error } = coachsListRespo;
  const coursList = useSelector((state) => state.coursList);
  const { Loading: LoadingCours, cours } = coursList;
  const seanceAdd = useSelector((state) => state.seanceAdd);
  const { Loading: LoadingAdd, successAdd, errorAdd } = seanceAdd;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCoachsRespo());
      dispatch(getListCours());
    } else {
      history('/');
    }
  }, [history, userInfo]);

  const handleAdd = (e) => {
    e.preventDefault();
    // console.log({ heureDebut, heureFin, idCours, idJour, idCoach });
    dispatch(addSeance(heureDebut, heureFin, idCours, idJour, idCoach));
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Add Seance
      </h1>

      {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {successAdd && (
        <Message variant='success'>Course ajoute avec succes</Message>
      )}
      {Loading || LoadingCours ? (
        <Loader />
      ) : (
        <Form onSubmit={handleAdd}>
          <Row>
            <Col>
              <Form.Group controlId='heureDebut'>
                <Form.Label>heure Debut </Form.Label>
                <Form.Control
                  as='select'
                  custom
                  defaultValue='1'
                  onChange={(e) => setHeureDebut(e.target.value)}
                >
                  <option value='1'>Start</option>
                  <option value='8'>8 am</option>
                  <option value='10'>10 am</option>
                  <option value='17'>17 pm</option>
                  <option value='19'>19 pm</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='heureFin'>
                <Form.Label>heure Fin </Form.Label>
                <Form.Control
                  as='select'
                  custom
                  defaultValue='1'
                  onChange={(e) => setHeureFin(e.target.value)}
                >
                  <option value='1'>End</option>
                  <option value='10'>10 am</option>
                  <option value='12'>12 am</option>
                  <option value='19'>19 pm</option>
                  <option value='21'>21 pm</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='jour'>
                <Form.Label>Jour</Form.Label>
                <Form.Control
                  as='select'
                  custom
                  defaultValue='8'
                  onChange={(e) => setJour(e.target.value)}
                >
                  <option value='8'>Day</option>
                  <option value='1'>Monday</option>
                  <option value='2'>Tuesday</option>
                  <option value='3'>Wednesday</option>
                  <option value='4'>Thursday</option>
                  <option value='5'>Friday</option>
                  <option value='6'>Saturday</option>
                  <option value='7'>Sunday</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId='coach'>
            <Form.Label>Coach</Form.Label>
            <Form.Control
              as='select'
              custom
              defaultValue='0'
              onChange={(e) => {
                setCoach(e.target.value);
              }}
            >
              <option key='0' value='0'>
                coach
              </option>
              {coachs.map((coach) => (
                <option key={coach.id} value={coach.id}>
                  {coach.profil.nom}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='cours'>
            <Form.Label>Cours</Form.Label>
            <Form.Control
              as='select'
              custom
              defaultValue='0'
              onChange={(e) => {
                setCours(e.target.value);
              }}
            >
              <option key='0' value='0'>
                cours
              </option>
              {cours.map((item) => (
                <option key={item.cours.id} value={item.cours.id}>
                  {item.cours.nomCours}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className='my-4'>
            <Button
              variant='primary'
              type='submit'
              className='btnLogin my-3 px-4'
              block
            >
              Ajouter
            </Button>
          </div>
        </Form>
      )}
    </FormContainer>
  );
};

export default AddSeanceScreen;
