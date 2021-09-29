import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../hooks/userContext'
import './ContainerItem.scss'

const ContainerItem = React.forwardRef((props, ref) => {
const {id} = props;
const { state, dispatch }  = useContext(UserContext);
const formRef = React.createRef();

const clickHandler = (e) => {
  e.preventDefault()
  dispatch({type: "modify", values: {msg: formRef.current.value, 'id' : id}})
  formRef.current.value = "";
}

const addLike = () => {
  dispatch({ type: "LIKE", values : {id}})
}

const handleDragStart = (event, id) => {
  const draggedItem = state[id];
  console.log(draggedItem)
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", event.target.parentNode);
  console.log(event.target.parentNode)
}

const handleOnDrop = (event) => {
  const id  = event.dataTransfer.getData("text/plain");
  console.log(event.target.parentNode)
  console.log("ID", id)
}

return (
  <div 
    onDragStart = {(event) => handleDragStart(event, id)} 
    onDrop = {(event) => handleOnDrop(event)}
    id = {id} draggable className = "main-block" ref = {ref}>
    <div className = "remove-button" onClick = {() => dispatch({ type: "remove" , values: {id}})}>✕</div>
    <span >{state[id].msg ? state[id].msg : "No message typed!"}</span>
    <span className = "likes-dislikes">
      <div className = "social-button social-likes" onClick = {() => addLike()}>👍  {state[id].votes}</div>
    </span>
  </div>
)
});

export default ContainerItem;