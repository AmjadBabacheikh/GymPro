import React from 'react';
import { Nav, ListGroup, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './SideBar.css';

const SideBar = ({ links }) => {
  return (
    <Nav className='col-md-12 d-none d-md-block sidebar nav-color'>
      {links.map((link, index) => (
        <Nav.Item key={index}>
          <LinkContainer to={link.route}>
            <Nav.Link>
              <i className={link.icon}></i>
              {link.title}
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  );
};
export default SideBar;
