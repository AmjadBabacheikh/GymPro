import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ClientsListScreen from './ClientsListScreen';
import ResponsableListScreen from './ResponsableListScreen';
import CoachListScreen from './CoachListScreen';
import '../components/SideBar.css';
const links = [
  {
    title: 'Clients',
    route: '/admin/clientslist',
  },
  {
    title: 'Responsables',
    route: '/admin/responsablelist',
  },
  {
    title: 'Coachs',
    route: '/admin/coachlist',
  },
];
const AdminDashboard = (props) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id='sidebar-wrapper'>
          <SideBar links={links} />
        </Col>
        <Col xs={10} id='page-content-wrapper'>
          <Switch>
            <Route
              path='/admin/clientslist'
              component={ClientsListScreen}
              exact
            />
            <Route
              path='/admin/clientslist/:pageNumber'
              component={ClientsListScreen}
              exact
            />
            <Route
              path='/admin/responsablelist'
              component={ResponsableListScreen}
              exact
            />
            <Route
              path='/admin/coachlist/:pageNumber'
              component={CoachListScreen}
              exact
            />
            <Route path='/admin/coachlist' component={CoachListScreen} exact />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminDashboard;
