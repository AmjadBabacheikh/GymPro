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
import { logout } from '../actions/userActions';
import './Header.css';
import logo from '../images/logo.png';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { Loading, error, userInfo } = userLogin;

  const isEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
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
              {userInfo && userInfo.user.role === 'admin' ? (
                <NavDropdown title='ADMIN' id='admin'>
                  <LinkContainer to='/admin'>
                    <NavDropdown.Item>dashboard</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
              {userInfo && userInfo.user.role === 'responsable' ? (
                <NavDropdown title='RESPONSABLE' id='responsable'>
                  <LinkContainer to='/responsable'>
                    <NavDropdown.Item>dashboard</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
              {/* {userInfo && userInfo.user.role !== 'client' ? (
                <LinkContainer to='/employe/chat'>
                  <Nav.Link className='nav-link'>
                    <i className='fas fa-envelope'></i>
                  </Nav.Link>
                </LinkContainer>
              ) : null} */}
              {userInfo && userInfo.user.role === 'client' ? (
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
              ) : null}
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`${
                      !isEmpty(userInfo) &&
                      userInfo.user.profil.prenom.toUpperCase()
                    } ${
                      !isEmpty(userInfo) &&
                      userInfo.user.profil.nom.toUpperCase()
                    }`}
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/client/factures'>
                      <NavDropdown.Item>factures</NavDropdown.Item>
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
                </>
              ) : (
                <LinkContainer to='/signin'>
                  <Nav.Link className='nav-link'>
                    <i className='fas fa-user'></i> SIGN IN
                  </Nav.Link>
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
