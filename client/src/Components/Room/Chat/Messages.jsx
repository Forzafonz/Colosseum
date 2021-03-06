import React, { useRef, useEffect } from 'react'
import './styles.scss'
import TimeAgo from 'react-timeago'
import NewMessage from './NewMessage'


export default function Messages({addMessage, state}) {
  // Mock number needs to be updated
  const chatNumber = 1;
  const user_id = localStorage.getItem('user_id');
  const username =localStorage.getItem('user_username');
  const avatar = localStorage.getItem('user_avatar');
  // Create a reference to a "fake" empty message to target it, so that we can scroll to the most up-to-date message
  // using function scrollToBottom 
  const messagesEndRef = useRef(null)
  // Create an array of individual messages using divs.
  // First if arbitrarily checks if user_Id === 2, then it is an owner (this logic is for demontstration only). In the final version instead of hardcoded "2"
  // we will check agains current session user_id.
  // Second if just generate messages from "others"
  // "state" has the following structure: {1: {..}, 2: {...}, 3: {...}}, so we need to run map to "convert to array"
  // Object.keys(state) returns array of keys, like that => [1, 2, 3]
  const messages = Object.keys(state).map(message => {
    if (state[message]['user_id'] === Number(user_id)) {
      return (
        <React.Fragment key = {message}>
        <div 
          className="message message-personal"
          key = {message}>
          <div key = {message} className = "message-top"><span>Sent <TimeAgo date={state[message]['date']}/></span></div>
          {state[message]['msg']}
        </div>
        </React.Fragment>)
        
    } else {
      return (
        <div className="message new"
           key = {message}>
          <div className = "message-top" key = {message}><span>Sent by {state[message]['username']} <TimeAgo date={state[message]['date']}/></span></div>
          <figure className="avatar">
          <img src={state[message]['avatar']} alt = "avatar" />
          </figure>  {state[message]['msg']}
        </div>
      )
    }
  });
  //Sort messages by date, so they show in the correct order in the chat:
  const sortedMessages = messages.sort((firstElem, secondElem) => {
    // Custom sort. Might be useless here
    if (Number(firstElem.key) > Number(secondElem.key)){
      return 1
    } else {
      return -1 
    }
  })

  // Function that 
  const submitMessage = (e, msg) => {
    // Remove me later  
    // check if message if not empty then calls addMessage function  with specified type. AddMessage function is defined in App.
    if (msg !== 0){
      addMessage({values : { msg: msg, 'user_id': Number(user_id), date: Date.now(), avatar, username}})
    }
  }
  // this function is invoked every time any button is pressed in textarrea of a newMessage
  // if keypressed was Enter, then it call "SubmitMessage" fucntion defined above.
  // if not - ignored!!!
  const handleKeyPress = (e, msg) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      submitMessage(e, msg);
    }
  }
  // Function used to scroll to the bottom of the chat. It uses "fake div" reference to access it and scroll this div into view.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Runs scrollToBottom function on each message update/
  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  // Defines messages continer including the "form" for a new message.
  // We also use NewMessage component and pass it submitMessage function and handleKeyPress function.
  return (
    <>
    <div className="messages">
      <div className="messages-content" ></div>
      {sortedMessages}
      <div className="message-null" ref={messagesEndRef} />
    </div>
    <NewMessage 
    onSumbit = {submitMessage} 
    onEnter = {handleKeyPress}
    />
    
    </>
  )
}


