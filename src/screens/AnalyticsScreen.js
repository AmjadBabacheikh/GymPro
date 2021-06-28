import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col, Table } from 'react-bootstrap';
import { getAnalyticsAdmin } from '../actions/userActions';
import { Bar } from 'react-chartjs-2';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './AnalyticsScreen.css';
const clients = [
  {
    id: 1,
    profil: {
      cin: 'D2345671',
      nom: 'babacheikh',
      prenom: 'amjad',
    },
    email: 'babacheikh@gmail.com',
  },
  {
    id: 2,
    profil: {
      cin: 'N23292',
      nom: 'kamal',
      prenom: 'hassan',
    },
    email: 'kamal@gmail.com',
  },
  {
    id: 3,
    profil: {
      cin: 'J68721',
      nom: 'alami',
      prenom: 'oussama',
    },
    email: 'alami@gmail.com',
  },
  {
    id: 4,
    profil: {
      cin: 'D21190',
      nom: 'El filali',
      prenom: 'Abdelwahab',
    },
    email: 'elfilali@gmail.com',
  },
  {
    id: 5,
    profil: {
      cin: 'J89021',
      nom: 'Bouhouch',
      prenom: 'Mahdi',
    },
    email: 'bouhouch@gmail.com',
  },
];
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const anlyticsAdmin = useSelector((state) => state.anlyticsAdmin);
  const { Loading, analytics, error } = anlyticsAdmin;
  useEffect(() => {
    dispatch(getAnalyticsAdmin());
  }, [dispatch]);
  const data = {
    labels: analytics?.datasets?.label,
    datasets: [
      {
        label: '',
        data: analytics?.datasets?.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 206, 23, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 23, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {Loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h3>Dashboard</h3>
          <Row>
            <Col md={4}>
              <Card className='card' style={{ width: '18rem', marginTop: 5 }}>
                <Row>
                  <Col md={4}>
                    <i
                      style={{ color: '#1EAE98' }}
                      className='fas fa-3x py-2 px-2 fa-shopping-cart'
                    ></i>
                  </Col>
                  <Col md={8}>
                    <h5>Orders</h5>
                    <h3>{analytics?.nombreFactures}</h3>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='card' style={{ width: '18rem', marginTop: 5 }}>
                <Row>
                  <Col md={4}>
                    <i
                      style={{ color: '#7FB414' }}
                      className='fas fa-3x py-2 px-2 fa-money-bill-alt'
                    ></i>
                  </Col>
                  <Col md={8}>
                    <h5>Benefit</h5>
                    <h3>{analytics?.revenue}</h3>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={4}>
              <Card className='card' style={{ width: '18rem', marginTop: 5 }}>
                <Row>
                  <Col md={4}>
                    <i
                      style={{ color: '#EE6F57' }}
                      className='fas fa-3x py-2 px-2 fa-user'
                    ></i>
                  </Col>
                  <Col md={8}>
                    <h5>Customers</h5>
                    <h3>{analytics?.nombreClient}</h3>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className='my-4' md={8}>
              <Card className='my-3' style={{ height: '27rem' }}>
                <h3 className='py-3 px-2'>Clients recents</h3>
                <Table striped bordered hover className='sm' responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>CIN</th>
                      <th> Name</th>
                      <th>EMAIL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.profil.cin}</td>
                        <td>{`${user.profil.prenom} ${user.profil.nom}`}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col className='my-4' md={4}>
              <Card className='my-2' style={{ height: '27.5rem' }}>
                <h3 className='py-3 px-2'>Benefit history</h3>
                <Bar data={data} options={options} />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AnalyticsScreen;
