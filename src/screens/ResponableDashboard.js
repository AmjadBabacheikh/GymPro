import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../components/SideBar';
import AddAbonnementScreen from './AddAbonnementScreen';
import AddClientScreen from './AddClientScreen';
import AddCourseScreen from './AddCourseScreen';
import CouponsListScreen from './CouponsListScreen';
import AddSeanceScreen from './AddSeanceScreen';
import '../components/SideBar.css';
const links = [
  {
    title: 'Ajouter Client',
    route: '/responsable/client',
  },
  {
    title: 'Creer Abonnement',
    route: '/responsable/abonnement',
  },
  {
    title: 'Creer Course',
    route: '/responsable/course',
  },
  {
    title: 'Coupons',
    route: '/responsable/couponlist',
  },
  {
    title: 'Creer Seance',
    route: '/responsable/seance',
  },
];
const ResponableDashboard = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id='sidebar-wrapper'>
          <SideBar links={links} />
        </Col>
        <Col xs={10} id='page-content-wrapper'>
          <Switch>
            <Route
              path='/responsable/client'
              component={AddClientScreen}
              exact
            />
            <Route path='/responsable' component={AddClientScreen} exact />
            <Route
              path='/responsable/abonnement'
              component={AddAbonnementScreen}
              exact
            />
            <Route
              path='/responsable/course'
              component={AddCourseScreen}
              exact
            />
            <Route
              path='/responsable/couponlist'
              component={CouponsListScreen}
              exact
            />
            <Route
              path='/responsable/couponlist/:pageNumber'
              component={CouponsListScreen}
              exact
            />
            <Route
              path='/responsable/seance'
              component={AddSeanceScreen}
              exact
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
export default ResponableDashboard;
