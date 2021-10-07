import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import './ContainerItem.scss'


const ContainerItem = React.forwardRef((props, ref) => {
  const element = <FontAwesomeIcon icon={faTrashAlt} />
  const arrow = <FontAwesomeIcon icon={faArrowAltCircleUp} />

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
      <div id = {id} className = "main-block" ref = {ref}>      
          <img className = "img-thumbnail" src = {thumbnail} onClick={() => setPlayingMedia(media_id)}/> 
          <div className = "remove-button" onClick = {() => deleteFromQueue()}>{element}</div>
          <div className = "votes" >{arrow }  {media_rating}</div>
          <div className = "video-info">
          {!liked && <button className = "votes-button" onClick = {() => voteAction()}>VOTE!</button>}
          {liked && <button className = "votes-button" onClick = {() => voteAction()}>REMOVE VOTE!</button>}
          </div>
      </div>
      <img src = "Pillars2.png" /> 
    </div>

  )
});

export default ContainerItem;