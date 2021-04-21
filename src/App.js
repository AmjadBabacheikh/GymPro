import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileUserScreen from './screens/ProfileUserScreen';
import UpdateProfileUserScreen from './screens/UpdateProfileUserScreen';
import ClientsListScreen from './screens/ClientsListScreen';
import './App.css';
import EmployeListScreen from './screens/EmployeListScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='main-dark'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/signin' component={SignInScreen} exact />
          <Route path='/register' component={SignUpScreen} exact />
          <Route path='/profile' component={ProfileUserScreen} exact />
          <Route
            path='/editProfile'
            component={UpdateProfileUserScreen}
            exact
          />
          <Route
            path='/admin/clientslist'
            component={ClientsListScreen}
            exact
          />

          <Route
            path='/admin/employelist'
            component={EmployeListScreen}
            exact
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
