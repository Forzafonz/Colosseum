import React from 'react'
import './ContainerItem.scss'

const ContainerItem = React.forwardRef((props, ref) => {

  const {id, dispatch, play_order, thumbnail, description, media_rating} = props;

  const addLike = () => {
    dispatch({ type: "LIKE", values : {id}})
  }

  return (
    <div
      id = {id} className = "main-block" ref = {ref}>
      <div className = "remove-button" onClick = {() => dispatch({ type: "remove" , values: {id}})}>✕</div>
      <span className = "likes-dislikes">
        <div className = "social-button social-likes" onClick = {() => addLike()}>👍  {media_rating}/10</div>
      </span>
      <div>
        {description}
      </div>
      <div>
        <img className = "img-thumbnail" src = {thumbnail}/>
      </div>
      

    </div>
  )
});

export default ContainerItem;