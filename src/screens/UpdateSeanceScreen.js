import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  getCoachsRespo,
  updateSeance,
  getSeance,
} from '../actions/reponsableActions';
import { getListCours } from '../actions/coursActions';
import { getSeances } from '../actions/userActions';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { GET_SEANCE_RESET } from '../constants/responsableConstants';
import './SignUpScreen.css';

const UpdateSeanceScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const idSeance = match.params.id;
  const [heureDebut, setHeureDebut] = useState(null);
  const [heureFin, setHeureFin] = useState(null);
  const [idCoach, setCoach] = useState(null);
  const [idCours, setCours] = useState(null);
  const [idJour, setJour] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const coachsListRespo = useSelector((state) => state.coachsListRespo);
  const { Loading, coachs, error } = coachsListRespo;
  const coursList = useSelector((state) => state.coursList);
  const { Loading: LoadingCours, cours } = coursList;
  const seanceDetail = useSelector((state) => state.seanceDetail);
  const seanceUpdate = useSelector((state) => state.seanceUpdate);
  const { success, error: errorUpdate } = seanceUpdate;
  const { Loading: LoadingSeance, seance, error: errorSeance } = seanceDetail;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getSeance(idSeance));
    if (success) {
      dispatch({ type: GET_SEANCE_RESET });
      history.push('/responsable/seances');
    }
  }, [dispatch, history, success]);
  useEffect(() => {
    dispatch(getCoachsRespo());
    dispatch(getListCours());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    const updatedSeance = {
      id: parseInt(idSeance),
      heureDebut: heureDebut || seance?.heureDebut,
      heureFin: heureFin || seance?.heureFin,
      cours: { id: idCours || seance?.cours?.id },
      jour: { id: idJour || seance?.jour?.id },
      coach: { id: idCoach || seance?.jour?.id },
    };
    dispatch(updateSeance(seance));
    console.log(updatedSeance);
  };
  return (
    <FormContainer className='align-middle'>
      <h1 className='my-4 text-center' style={{ color: ' #ee6f57' }}>
        Update Seance
      </h1>

      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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
                  defaultValue={seance?.heureDebut || '1'}
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
                  defaultValue={seance?.heureFin || '1'}
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
                  defaultValue={seance?.jour?.id || '8'}
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
              defaultValue={seance?.coach?.id || '0'}
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
              defaultValue={seance?.cours?.id || '0'}
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
              update
            </Button>
          </div>
        </Form>
      )}
    </FormContainer>
  );
};

export default UpdateSeanceScreen;
