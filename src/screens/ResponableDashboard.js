import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../components/SideBar';
import AddAbonnementScreen from './AddAbonnementScreen';
import AddClientScreen from './AddClientScreen';
import AddCourseScreen from './AddCourseScreen';
import AddCouponScreen from './AddCouponScreen';
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
    route: '/responsable/coupon',
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
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
export default ResponableDashboard;
