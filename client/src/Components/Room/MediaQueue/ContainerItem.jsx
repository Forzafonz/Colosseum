import React, {useState} from 'react'
import './ContainerItem.scss'

const ContainerItem = React.forwardRef((props, ref) => {

  const [liked, setLiked] = useState(false)

  const {
    id, 
    dispatch, 
    thumbnail, 
    media_rating, 
    setPlayingMedia, 
    link, 
    removeMediaFromPlaylist, 
    media_id, 
    setOrderFromLikes
  } = props;


  const deleteFromQueue = () => {
    removeMediaFromPlaylist(media_id)
    dispatch({ type: "remove" , values: {media_id}})
  }

  const voteAction = () => {
    let like = false
    if (!liked) {
      like = true
    }
    setOrderFromLikes(media_id, like)
    setLiked(!liked)
  }


  return (

    <div className= "pillar">
    <div
      id = {id} className = "main-block" ref = {ref}>
      <div className = "remove-button" onClick = {() => deleteFromQueue()}>✕</div>
      <span className = "likes-dislikes">
        <div className = "social-button social-likes" onClick = {() => voteAction()}> {media_rating}/10</div>
      </span>
      <div>
        {/* {description} */}
      </div>
      <div>
        <img className = "img-thumbnail" src = {thumbnail} onClick={() => setPlayingMedia(media_id)}/>
      </div>
    </div>
      <img src = "Pillars2.png" /> 
    </div>

  )
});

export default ContainerItem;