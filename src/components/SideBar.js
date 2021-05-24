import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './SideBar.css';

const SideBar = ({ links }) => {
  return (
    <Nav className='col-md-12 d-none d-md-block bg-dark sidebar'>
      {links.map((link, index) => (
        <Nav.Item key={index}>
          <LinkContainer to={link.route}>
            <Nav.Link>{link.title}</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ))}
    </Nav>
  );
};
export default SideBar;
