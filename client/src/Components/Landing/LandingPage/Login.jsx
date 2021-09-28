import React, {useRef} from 'react'
import './login.scss'
import {Button, Form, FloatingLabel} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const password = useRef();
  const login = useRef();
  const history = useHistory();

  //const cat = localStorage.getItem('myCat');

  const submitHandler = (event) =>{
    event.preventDefault();
  
    axios.put('/api/login', {password: password.current.value, login: login.current.value})
    .then((response)=> {
      localStorage.setItem('user_id', response.data.id);
      history.push('/home')
    })
    .catch((error) => console.log(`error: ${error}`))
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
      <div className = "close-button" onClick = {cancelHandler}><div>✕</div></div>
    </div>
    <Form className = "form-main">
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
