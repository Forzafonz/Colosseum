import React from 'react'
import './styles.scss'
import Messages from './Messages'

export default function Chat({addMessage, state}) {

  const username =localStorage.getItem('user_username')
  const avatar = localStorage.getItem('user_avatar')

  return (
    // Create a "Header" of the chat with person name and avatar
    <div className="chat">
      <div className="chat-title">
        <h1>Chat as</h1>
        <h2>{username}</h2>
        <figure className="avatar">
          <img src={avatar} alt = "avatar" />
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
