import React, {useRef, useState} from 'react'
import './login.scss'
import {Button, Form, FloatingLabel, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login({setPlaylist, setStale}) {
  const password = useRef();
  const login = useRef();
  const history = useHistory();
  const [show, setShow] = useState(false);

  

  //const cat = localStorage.getItem('myCat');

  const userId = localStorage.user_id;

  const submitHandler = (event) =>{
    event.preventDefault();
  
    axios.put('/api/login', {password: password.current.value, login: login.current.value})
    .then((response)=> {
      localStorage.setItem('user_id', response.data.id);
      localStorage.setItem('user_avatar', response.data.avatar);
      localStorage.setItem('user_username', response.data.username);
      setStale(true);
      setPlaylist(null);
      history.push('/home')
    })
    .catch((error) => {
      setShow(true)
    })
    password.current.value = "";
    login.current.value = "";
  }

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  }

  return (
    <>
    <div className = "form">
    <div className = "header">
      LOGGED IN USER: {userId}
      <div className = "close-button" onClick = {cancelHandler}><div>✕</div></div>
    </div>
    <Form className = "form-main">
      <Alert variant="danger" show = {show}>
        Sorry there is no user with such email or username or your password is incorrect.
      </Alert>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel
          controlId="floatingInput"
          label="Enter email or username"
          className="mb-3" >
        <Form.Control placeholder="Enter email or username" ref = {login}/>
      </FloatingLabel>
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <FloatingLabel
            controlId="floatingInput"
            label="Enter password"
            className="mb-3" >
        <Form.Control type="password" placeholder="Password" ref = {password}/>
      </FloatingLabel>
      <Form.Text id="passwordHelpBlock" muted>
          Your password must be 4-20 characters long, contain letters and numbers, and
            must not contain spaces, special characters, or emoji.
         </Form.Text>
    </Form.Group>
     {/* <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>Select your avatar</Form.Label>
        <Form.Control type="file" size="sm" />
      </Form.Group> */}
      <span className = "buttons">
        <Button variant="primary" type="submit" onClick = {event => submitHandler(event)}>
        Submit
        </Button>{' '}<Button variant="secondary" onClick = {event =>cancelHandler(event)}>Cancel</Button>
        </span>
      </Form>
    </div>
    </>
  )
}
