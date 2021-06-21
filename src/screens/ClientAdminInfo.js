import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClient } from '../actions/userActions';
import { Col, Row, Button, ListGroup, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './ProfileUserScreen.css';

const ClientAdminInfo = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const clientInfos = useSelector((state) => state.clientInfos);
  const { Loading, client, error } = clientInfos;
  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getClient(id));
  }, [dispatch]);
  return (
    <Container>
      {Loading ? (
        <Loader />
      ) : (
        <>
          {!isEmpty(client) && (
            <Row>
              <Col md={9} xs={12} className='my-3'>
                <h4 style={{ marginBottom: '20px', color: '#333' }}>
                  {!isEmpty(client) ? client.profil.nom.toUpperCase() : null}
                  <span> </span>
                  {!isEmpty(client) ? client.profil.prenom.toUpperCase() : null}
                </h4>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>CIN</Col>
                      <Col className='info'>
                        <strong>{client.profil.cin}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Name</Col>
                      <Col className='info'>
                        <strong>
                          {client.profil.nom} {client.profil.prenom}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Phone</Col>
                      <Col className='info'>
                        <strong>{client.profil.telephone}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Genre</Col>
                      <Col className='info'>
                        <strong>{client.profil.genre}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Date Naissance</Col>
                      <Col className='info'>
                        <strong>
                          {client.profil.dateNaissance
                            ? client.profil.dateNaissance.slice(0, 10)
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

export default ClientAdminInfo;
