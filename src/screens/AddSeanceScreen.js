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
        Ajouter Seance
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
                  type='text'
                  placeholder='heure debut'
                  value={heureDebut}
                  onChange={(e) => {
                    setHeureDebut(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='heureFin'>
                <Form.Label>heure Fin </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='heure fin'
                  value={heureFin}
                  onChange={(e) => {
                    setHeureFin(e.target.value);
                  }}
                />
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
                  <option value='8'>Jour</option>
                  <option value='1'>Lundi</option>
                  <option value='2'>Mardi</option>
                  <option value='3'>Mercredi</option>
                  <option value='4'>Jeudi</option>
                  <option value='5'>Vendredi</option>
                  <option value='6'>Samedi</option>
                  <option value='7'>Dimanche</option>
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
