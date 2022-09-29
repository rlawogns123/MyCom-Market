import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Heading() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">마이컴마켓</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/login">Upload</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Heading;
