import React from 'react'
import './ContainerItem.scss'

const ContainerItem = React.forwardRef((props, ref) => {

  const {id, dispatch, thumbnail, media_rating, setPlayingMedia, link, removeMediaFromPlaylist, media_id} = props;

  const addLike = () => {
    dispatch({ type: "LIKE", values : {id}})
  }

  const deleteFromQueue = () => {
    removeMediaFromPlaylist(media_id)
    dispatch({ type: "remove" , values: {media_id}})
  }


  return (

    <div className= "pillar">
    <div
      id = {id} className = "main-block" ref = {ref}>
      <div className = "remove-button" onClick = {() => deleteFromQueue()}>✕</div>
      <span className = "likes-dislikes">
        <div className = "social-button social-likes" onClick = {() => addLike()}> {media_rating}/10</div>
      </span>
      <div>
        {/* {description} */}
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