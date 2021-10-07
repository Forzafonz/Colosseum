import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faArrowAltCircleUp, faStar as Star } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'

import './ContainerItem.scss'


const ContainerItem = React.forwardRef((props, ref) => {
  const element = <FontAwesomeIcon icon={faTrashAlt} />
  const arrow = <FontAwesomeIcon icon={faArrowAltCircleUp} />
  const star = <FontAwesomeIcon icon={Star} size="3x"/>
  const starEmpty = <FontAwesomeIcon icon={faStar} size="3x"/>

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
          <div className = "top-header"></div>
          <div className = "video-info">
          {!liked && <div className = "votes-button" onClick = {() => voteAction()}>{starEmpty}</div>}
          {liked && <div className = "votes-button" onClick = {() => voteAction()}>{star}</div>}
          </div>
      </div>
      <img src = "Pillars2.png" /> 
    </div>

  )
});

export default ContainerItem;