import React from 'react'
import './main.scss'
import { useHistory } from 'react-router-dom';

export default function Menu() {
  const history = useHistory();

  const submitHandler = (event) =>{

    event.preventDefault();
    history.push('/login')
   
  }


  return (
    <>
    <div className = "name">Colosseum</div>
    <div className = "menu">
        <span className = 'link' onClick = {event => submitHandler(event)}>Login</span>
        <span className>|</span>
        <span className = 'link'>Sign Up</span>
    </div>
    </>
  )
}
