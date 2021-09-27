import React from 'react'
import './styles.scss'
import Messages from './Messages'

export default function Chat({addMessage, state}) {
 
  return (
    // Create a "Header" of the chat with person name and avatar
    <div className="chat">
      <div className="chat-title">
        <h1>Random</h1>
        <h2>Person</h2>
        <figure className="avatar">
          <img src="https://i.imgflip.com/5110mw.png" alt = "avatar" />
        </figure>
      </div>
      {/* Create a new component and pass props to it addMessage and state */}
      <Messages 
      addMessage = {addMessage}
      state = {state}
      />
    </div>
  )
}
