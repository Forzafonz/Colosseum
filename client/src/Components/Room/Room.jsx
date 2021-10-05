import './Room.scss';
import Chat from './Chat/Chat';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import React, { useReducer, useEffect, useState } from 'react';
import Queue from './MediaQueue/Queue';
import Mediaform from './Mediaform/Mediaform';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
// import { io } from "socket.io-client"

const NEWMESSAGE = 'newmessage'
const INITIALIZE = 'initialize'

function reducer(state, action){

  const newMessage = (input) => {
    const newState = {...state}
    const updateState = {...newState, [input.date] : input}
    return updateState
  }


  const initialize = (input) => {
    const newState = {};
    input.forEach(element => {

      const date = Number(element.date);
      newState[date] = {msg: element.text, date: date, user_id : element.user_id, avatar: element.avatar, username: element.username}
    });
    return newState;

  }

  const actions = {
    [NEWMESSAGE] : newMessage,
    [INITIALIZE] : initialize
  }

  return actions[action.type](action.values);

}

function NewRoom({
  state1,
  setPlaylist,
  setPlayingMedia, 
  addMediaToPlaylist, 
  removeMediaFromPlaylist, 
  setNextMedia, 
  setOrderFromLikes, 
  addMessage, 
  elapsedTimeOther, 
  conn, 
  playing
}) 

{

  const initialState = { msg: "Hello", sent: "Anton", date: Date.now()}
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [conn, setConn] = useState(undefined);
  const [empty, setEmpty] = useState(false)
  const history = useHistory();
  const user_id = localStorage.getItem('user_id')
  
  

  //This useEffect checks if current playlist is empty, and if so, it sets "empty" state to true, esle it sets it to false;
  useEffect(()=>{

    let currentPlaylist = state1.current_playlist;

    if (currentPlaylist) {

      if (Object.keys(state1.playlists_for_user).length){
        if (!Object.keys(state1.playlists_for_user[currentPlaylist]['media']).length) {
          console.log("I am here because", !Object.keys(state1.playlists_for_user[currentPlaylist]['media']).length)
          setEmpty(true)
        }
      }
    }
      
  }, [state1])

  // useEffect(() =>{
  //   if (history.location.state) {
  //     setPlaylist(history.location.state.id)
  //     console.log("This are my props", history.location.state.id)
  //   }
  // }, [history])

  
  return (
    <div className="room">
      {/* <Header /> */}
    
        <section className="media-and-chat">
          
          <MediaPlayer  
          state = {state1} 
          setNextMedia = {setNextMedia} 
          elapsedTimeOther = {elapsedTimeOther}
          conn = {conn}
          playing = {playing}
          /> 
          {empty && <Mediaform addMediaToPlaylist = {addMediaToPlaylist} state = {state1} setEmpty = {setEmpty}/>}

          <section className="chat-container">
          {/* //Create a chat component and pass two props: 
          addMessage and the entire state */}
            <Chat
            state = {state1.messages}
            addMessage = {addMessage}
            /> 
          </section>
        </section>
        <Queue
          setEmpty = {setEmpty} 
          state1 = {state1} 
          setPlayingMedia={setPlayingMedia}
          removeMediaFromPlaylist = {removeMediaFromPlaylist}
          setOrderFromLikes = {setOrderFromLikes}
          addMessage = {addMessage}
          />
     
    </div>
  );
}

export default NewRoom;
