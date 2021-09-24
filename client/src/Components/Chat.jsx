import React from 'react'
import './styles.scss'
import Messages from './Messages'

export default function Chat() {
  return (
    <div className="chat">
      <div className="chat-title">
        <h1>Random</h1>
        <h2>Person</h2>
        <figure className="avatar">
          <img src="https://i.imgflip.com/5110mw.png" alt = "avatar" />
        </figure>
      </div>
      <Messages />

    </div>
  )
}
