import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ClientsListScreen from './ClientsListScreen';
import ResponsableListScreen from './ResponsableListScreen';
import CoachListScreen from './CoachListScreen';
import ClientAdminInfo from './ClientAdminInfo';
import EmployeAdminInfo from './EmployeAdminInfo';
import FacturesListAdmin from './FacturesListAdmin';
import DetailFactureAdminScreen from './DetailFactureAdminScreen';
import AnalyticsScreen from './AnalyticsScreen';
import '../components/SideBar.css';
const links = [
  {
    title: 'Dashboard',
    route: '/admin',
    icon: 'fas fa-home mx-3',
  },
  {
    title: 'Customers',
    route: '/admin/clientslist',
    icon: 'fas fa-user mx-3',
  },
  {
    title: 'Responsables',
    route: '/admin/responsablelist',
    icon: 'fas fa-user mx-3',
  },
  {
    title: 'Coachs',
    route: '/admin/coachlist',
    icon: 'fas fa-user mx-3',
  },
  {
    title: 'Invoices',
    route: '/admin/factureslist',
    icon: 'fas fa-file-invoice mx-3',
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
            <Route path='/admin' component={AnalyticsScreen} exact />
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
              path='/admin/responsablelist/:pageNumber'
              component={ResponsableListScreen}
              exact
            />
            <Route
              path='/admin/coachlist/:pageNumber'
              component={CoachListScreen}
              exact
            />
            <Route path='/admin/coachlist' component={CoachListScreen} exact />
            <Route path='/admin/client/:id' component={ClientAdminInfo} exact />
            <Route
              path='/admin/employe/:id'
              component={EmployeAdminInfo}
              exact
            />
            <Route
              path='/admin/factureslist'
              component={FacturesListAdmin}
              exact
            />
            <Route
              path='/admin/factureslist/:pageNumber'
              component={FacturesListAdmin}
              exact
            />
            <Route
              path='/admin/facture/:id'
              component={DetailFactureAdminScreen}
              exact
            />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminDashboard;
