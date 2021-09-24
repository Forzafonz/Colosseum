import './App.css';
import Chat from './Components/Chat';
import React, { useReducer, useEffect } from 'react';
import { UserContext } from './hooks/userContext';
import axios from 'axios';

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
      newState[date] = {msg: element.text, date: date, user_id : element.user_id}
    });
    return newState;

  }

  const actions = {
    [NEWMESSAGE] : newMessage,
    [INITIALIZE] : initialize
  }

  return actions[action.type](action.values);

}

function App() {
  const initialState = { 0 : { msg: "Hello", sent: "Anton", date: Date.now()}}
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('/api/messages')
    .then((data) => {
      dispatch({ type: "initialize", values: data.data})
    })
  
  },[])
  
  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8000", "JSON")

    ws.onmessage = function (event) {
      console.log("Here is data: ", event.data)
      const data = JSON.parse(event.data)
      if(data.type === "UPDATE_CHAT") {
        const {msg} = data;
        console.log("My message:", msg)
        dispatch({ type : NEWMESSAGE, values : msg})
      }
    }

    return () => ws.close();

  }, [])


  const addMessage = (message) => {
    return axios.put('/api/messages/new', {message})
    .then((result) => {
      dispatch(message)
    })
    .catch((error) => console.log(error.response.data))
  }


  return (
  <UserContext.Provider value = {{state, dispatch, addMessage}}>
    <Chat />
   </UserContext.Provider>
  );
}

export default App;
