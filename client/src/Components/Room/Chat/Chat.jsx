import React from 'react'
import './styles.scss'
import Messages from './Messages'

export default function Chat({addMessage, state}) {

  const username =localStorage.getItem('user_username')
  const avatar = localStorage.getItem('user_avatar')

  return (
    // Create a "Header" of the chat with person name and avatar
    <div className="chat">
      {/* <div className = "chat-title head">
        <div className = "chat_click-chat">Chat</div><div className = "chat_click-room">Room</div>
        </div> */}
      <div className="chat-title">
        <h1>{username}</h1>
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
