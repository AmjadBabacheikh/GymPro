import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar,
  Button,
  Nav,
  Container,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout, getMyProfile } from '../actions/userActions';
import './Header.css';
import logo from '../images/logo.png';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;
  const userProfile = useSelector((state) => state.userProfile);
  const { Loading: LoadingProfile, user, error: errorProfile } = userProfile;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <header>
      <Navbar className='nav-color' expand='lg'>
        <Container>
          <LinkContainer to='/' style={{ cursor: 'pointer' }}>
            <Image alt='GymPro logo' src={logo} />
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link className='nav-link'>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/services'>
                <Nav.Link className='nav-link'>SERVICES</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/classes'>
                <Nav.Link className='nav-link'>CLASSES</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
                <Nav.Link className='nav-link'>ABOUT</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={`${
                    !isEmpty(userInfo) &&
                    userInfo.user.profil.prenom.toUpperCase()
                  } ${
                    !isEmpty(userInfo) && userInfo.user.profil.nom.toUpperCase()
                  }`}
                  id='username'
                >
                  {userInfo && userInfo.user.role === 'admin' ? (
                    <>
                      <LinkContainer to='/admin/clientslist'>
                        <NavDropdown.Item>clients</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/employelist'>
                        <NavDropdown.Item>employes</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/logs'>
                        <NavDropdown.Item>logs</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : null}
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <Route
                    render={({ history }) => (
                      <NavDropdown.Item
                        history={history}
                        onClick={() => {
                          dispatch(logout());
                          history.push('/');
                        }}
                      >
                        logout
                      </NavDropdown.Item>
                    )}
                  />
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link className='nav-link'>CONNEXION</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
