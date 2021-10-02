import './Room.scss';
import Chat from './Chat/Chat';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import React, { useReducer, useEffect, useState } from 'react';
import Queue from './MediaQueue/Queue';
import Mediaform from './Mediaform/Mediaform';

import axios from 'axios';
import { io } from "socket.io-client"

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

function NewRoom({state1, setPlayingMedia, addMediaToPlaylist, removeMediaFromPlaylist, setNextMedia}) {
  const initialState = { msg: "Hello", sent: "Anton", date: Date.now()}
  const [state, dispatch] = useReducer(reducer, initialState)
  const [conn, setConn] = useState(undefined);
  const [empty, setEmpty] = useState(false)

  const user_id = localStorage.getItem('user_id')


  //This useEffect checks if current playlist is empty, and if so, it sets "empty" state to true, esle it sets it to false;
  useEffect(()=>{

    let currentPlaylist = state1.current_playlist;
    console.log("STATE1 in room which makes fishy things", state1)
    console.log(currentPlaylist)
    console.log(state1.playlists_for_user[currentPlaylist]['media'])
    console.log("END OF FISHY THINGS")

    if (currentPlaylist) {

      if (Object.keys(state1.playlists_for_user).length){
        if (!Object.keys(state1.playlists_for_user[currentPlaylist]['media']).length) {
          console.log("I am here because", !Object.keys(state1.playlists_for_user[currentPlaylist]['media']).length)
          setEmpty(true)
        }
      }
    }
      
  }, [state1])

  // Initilize io-socket connection (Required for synchronious updates)
  useEffect(() => {
    const socket = io('http://localhost:8000');
    setConn(socket);
  }, [])

  // On the first render pulls message data from the database;
  useEffect(() => {
    axios.get(`/api/messages/${user_id}`)
    .then((response) => {
      // Dispacth command to reducer to initialize state with data pulled from the DB.
      dispatch({ type: "initialize", values: response.data})
    })
  
  },[])

  // //REFACTOR INTO ONE useEffect TO PULL ALL APP DATA FROM BACKEND
  // // On the first render pulls media data from the database;
  // useEffect(() => {
  //   axios.get('/api/media')
  //   .then((response) => {
      
  //     //Set media to the media in the db
  //     setMediaList(response.data);

  //   })
  
  // },[])

  // Listen to any changes to connection and trigger dispatch if message type is "UPDATE CHAT"
  useEffect(() => {
    if (conn) {
      //check if message chat is "UPDATE_CHAT" and dispatch
      conn.on("UPDATE_CHAT", data => {
        //Dispatch with newmessage type in order to add new message which was sent by another user to the state.
        dispatch({ type : NEWMESSAGE, values : data.msg})
      })

    }
  }, [conn])

  // This function is passed to Messages components via props and called on there
  const addMessage = (message) => {
    //  Send a put request to add a new message
    return axios.put('/api/messages/new', {message})
    .then((result) => {
      // Dispathing a command to reducer with type 'newmessage'. Message argument already have a form of {type: ..., value: ...}
      dispatch(message)
    })
    .catch((error) => console.log(error.response.data))
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <main className="layout">
        <section className="media-and-chat">
          {!empty ? 
          <MediaPlayer  state = {state1} setNextMedia = {setNextMedia} /> : 
          <Mediaform addMediaToPlaylist = {addMediaToPlaylist} state = {state1} setEmpty = {setEmpty}/>}
          <section className="chat-container">
          {/* //Create a chat component and pass two props: 
          addMessage and the entire state */}
            <Chat
            state = {state}
            addMessage = {addMessage}
            />
          </section>
        </section>
        <Queue
          setEmpty = {setEmpty} 
          state1 = {state1} 
          setPlayingMedia={setPlayingMedia}
          removeMediaFromPlaylist = {removeMediaFromPlaylist}
          />
      </main>
    </div>
  );
}

export default NewRoom;
