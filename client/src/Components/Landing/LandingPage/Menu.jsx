import React from 'react'
import './main.scss'

export default function Menu() {
  return (
    <>
    <div className = "name">Colosseum</div>
    <div className = "menu">
        <span className = 'link'>Login</span>
        <span className>|</span>
        <span className = 'link'>Sign Up</span>
    </div>
    </>
  )
}
