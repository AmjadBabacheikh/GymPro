import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileUserScreen from './screens/ProfileUserScreen';
import UpdateProfileUserScreen from './screens/UpdateProfileUserScreen';
import ClientsListScreen from './screens/ClientsListScreen';
import CoachListScreen from './screens/CoachListScreen';
import ResponsableListScreen from './screens/ResponsableListScreen';
import ResponableDashboard from './screens/ResponableDashboard';
import ServicesScreen from './screens/ServicesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CartScreen from './screens/CartScreen';
import AdminDashboard from './screens/AdminDashboard';
import OrderScreen from './screens/OrderScreen';
import './App.css';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='main-dark'>
        {/* <Container> */}
        <Switch>
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
            path='/admin'
            component={AdminDashboard}
            // exact
          />
          <Route path='/payment' component={OrderScreen} exact />
          <Route
            path='/responsable'
            component={ResponableDashboard}
            // exact
          />
          <Route path='/services' component={ServicesScreen} exact />
          {/* </Container> */}
          <Route path='/services/:id' component={ServiceDetailScreen} exact />
          <Route path='/cart' component={CartScreen} exact />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
