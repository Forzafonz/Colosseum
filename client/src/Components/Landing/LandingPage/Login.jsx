import React from 'react'
import './login.scss'
import {Button, Form, FloatingLabel} from 'react-bootstrap';

export default function Login() {
  return (
    <>
    <div className = "form">
    <div className = "header">
      <div className = "close-button"><div>✕</div></div>
    </div>
    <Form className = "form-main">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel
          controlId="floatingInput"
          label="Enter email or username"
          className="mb-3" >
        <Form.Control placeholder="Enter email or username" />
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
        <Form.Control type="password" placeholder="Password" />
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
        <Button variant="primary" type="submit">
        Submit
        </Button>{' '}<Button variant="secondary">Cancel</Button>
        </span>
      </Form>
    </div>
    </>
  )
}
