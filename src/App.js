import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import CoursesScreen from './screens/CoursesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CartScreen from './screens/CartScreen';
import AdminDashboard from './screens/AdminDashboard';
import OrderScreen from './screens/OrderScreen';
import FacturesClientsScreen from './screens/FacturesClientsScreen';
import ClassesScreen from './screens/ClassesScreen';
import ChatScreen from './screens/ChatScreen';
import AboutScreen from './screens/AboutScreen';
import ClientFactureDetail from './screens/ClientFactureDetail';
import Message from './components/Message';
import './App.css';
const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      {userInfo?.user?.statusClient?.nomStatus === 'suspendu' && (
        <Message varaint='info'>You are invited to subscribe</Message>
      )}
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
          <Route path='/services' component={CoursesScreen} exact />
          {/* </Container> */}
          <Route path='/services/:id' component={ServiceDetailScreen} exact />
          <Route path='/cart' component={CartScreen} exact />
          <Route
            path='/client/factures'
            component={FacturesClientsScreen}
            exact
          />
          <Route
            path='/client/factures/:pageNumber'
            component={FacturesClientsScreen}
            exact
          />
          <Route
            path='/client/facture/:id'
            component={ClientFactureDetail}
            exact
          />
          <Route path='/classes' component={ClassesScreen} exact />
          <Route path='/employe/chat' component={ChatScreen} exact />
          <Route path='/about' component={AboutScreen} exact />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
