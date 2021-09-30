import React from 'react'
import './ContainerItem.scss'

const ContainerItem = React.forwardRef((props, ref) => {

  const {id, dispatch, play_order, thumbnail, description, media_rating, setPlayingMedia, link} = props;

  const addLike = () => {
    dispatch({ type: "LIKE", values : {id}})
  }



  return (

    <div className= "pillar">
    <div
      id = {id} className = "main-block" ref = {ref}>
      <div className = "remove-button" onClick = {() => dispatch({ type: "remove" , values: {id}})}>✕</div>
      <span className = "likes-dislikes">
        <div className = "social-button social-likes" onClick = {() => addLike()}>  {media_rating}/10</div>
      </span>
      <div>
        {description}
      </div>
      <div>
        <img className = "img-thumbnail" src = {thumbnail} onClick={() => setPlayingMedia(link)}/>
      </div>
    </div>
      <img src = "Pillars2.png" /> 
    </div>

  )
});

export default ContainerItem;