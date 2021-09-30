import React, { useReducer } from 'react';
import Container from './Container';
import { UserContext } from '../../../hooks/userContext';
import ContainerItem from './ContainerItem';
import NewMessage from './NewMessage';

const REMOVE = 'remove'
const ADD = "modify"
const ADDNEW = 'ADDNEW'
const LIKE = "LIKE"
const DISLIKE = "DISLIKE"

function reducer (state, action) {
  
  const add = (input) => {
    const {msg, id} = input.values;
    const newState = {...state};
    const updatedDay = {...newState[id], 'msg': msg};
    const updatedState = {...state, [id] : updatedDay};
    return updatedState;
  }

  const remove = (input) => {
    
    const { id } = input.values;
    const newState = {...state};
    delete newState[id];
    return newState;

  }

  const addnew = (message) => {
    const id = Date.now()
    return {...state, [id]: { msg: message.values.msg , 'id' : id, votes: 0, dislikes: 0}}
  }

  const addlike = (input) => {
    const {id} = input.values;
    const newState = {...state};
    const updatedPost = {...newState[id], 'votes': newState[id].votes + 1};
    const updatedState = {...state, [id] : updatedPost};
    return updatedState;
  }

  const adddislike = (input) => {
    const {id} = input.values;
    const newState = {...state};
    const updatedPost = {...newState[id], 'dislikes': newState[id].dislikes + 1};
    const updatedState = {...state, [id] : updatedPost};
    return updatedState;
  }


  const actions = {

    [ADD]: add,
    [REMOVE]: remove,
    [ADDNEW]: addnew,
    [LIKE] : addlike,
    [DISLIKE] :adddislike

  }

  return actions[action.type](action)

}

function Queue() {
  const initialState = {0: {votes: -1, id: 0}};
  
  // const initialState = {};
  const [state, dispatch] = useReducer(reducer, initialState)
  //ItemsRef return array of currents, like that: {current: [{current: ref}, {current: ref}]}
  
  const refs = React.useMemo(
    () =>
      Object.keys(state).map(() => ({
        current: null,
      })),
    [state]
  );

  const containers = Object.keys(state).map((container, i) => {
    if (container === "0") {
      return <NewMessage 
      ref = {refs[i]} 
      id = {container} 
      key = {container}/>
    }
    return <ContainerItem
    ref= {refs[i]}
    key = {container} 
    id = {container}/>

  });

  containers.sort((firstEl, secondEl) => { 
    const firstId = firstEl.props.id;
    const secondId= secondEl.props.id;
    const firstElVotes = Number(state[firstId].votes);
    const secondElVotes = Number(state[secondId].votes);

    return  secondElVotes - firstElVotes;

  })

  return (
    <UserContext.Provider value = {{state, dispatch}}>
      <Container>
        {containers}
      </Container>
    </UserContext.Provider>
  );
}

export default Queue;
