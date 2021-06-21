import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmploye } from '../actions/userActions';
import { Col, Row, Button, ListGroup, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './ProfileUserScreen.css';
import { LinkContainer } from 'react-router-bootstrap';

const EmployeAdminInfo = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const employeInfos = useSelector((state) => state.employeInfos);
  const { Loading, employe, error } = employeInfos;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getEmploye(id));
  }, [dispatch]);
  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : (
        <>
          {!isEmpty(employe) && (
            <Row>
              <Col md={9} xs={12} className='my-3'>
                <h4 style={{ marginBottom: '20px', color: '#333' }}>
                  {!isEmpty(employe) ? employe.profil.nom.toUpperCase() : null}
                  <span> </span>
                  {!isEmpty(employe)
                    ? employe.profil.prenom.toUpperCase()
                    : null}
                </h4>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>CIN</Col>
                      <Col className='info'>
                        <strong>{employe.profil.cin}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Name</Col>
                      <Col className='info'>
                        <strong>
                          {employe.profil.nom} {employe.profil.prenom}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Phone</Col>
                      <Col className='info'>
                        <strong>{employe.profil.telephone}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Genre</Col>
                      <Col className='info'>
                        <strong>{employe.profil.genre}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Date Naissance</Col>
                      <Col className='info'>
                        <strong>
                          {employe.profil.dateNaissance
                            ? employe.profil.dateNaissance.slice(0, 10)
                            : null}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default EmployeAdminInfo;
