import React from 'react';
import {Navbar, Container, Nav, Image} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Header.scss'


function Header({setPlaylist}){
  const history = useHistory();
  const username = localStorage.getItem('user_username');
  const avatar = localStorage.getItem('user_avatar');

  const logOut = () => {
    setPlaylist(null)
    localStorage.clear();
    history.push(`/`);
  }
  

  return (
    <Navbar bg="dark" variant="dark" className= "pb-0 mt-0 mb-0 navbar">
    <Container fluid>
      <Nav>
       <Nav.Item className= "ms-4 pt-0 mt-0 mb-0">
        <Image src="Colloseum.png" className="d-inline-block align-top" width="50" height="auto"/>
      </Nav.Item>
      <Nav.Item className= "ms-4 mt-0 pt-0 mt-0 mb-0">
        <Navbar.Brand as={Link} to="/home">Colosseum</Navbar.Brand>
      </Nav.Item>
      <Nav.Item className= "ms-4 mt-0 pt-0 mt-0 mb-0">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
      </Nav.Item>
      </Nav>
      <Nav>
      <Navbar.Text className="ms-0 me-4 pt-2">
        <span>Signed in as: <span className="username">{username}</span></span>
      </Navbar.Text>
      <Nav.Item className="ms-2 me-4 pt-1">
        <Image src={avatar} className="d-inline-block align-top image" width="30" height="30"/>
      </Nav.Item>
      <Nav.Item className="ms-0 me-4 pt-0 ps-0">
        <Nav.Link onClick={()=> logOut()}>Log Out</Nav.Link>
      </Nav.Item>
      </Nav>
      </Container>
  </Navbar>
  );
}

export default Header;