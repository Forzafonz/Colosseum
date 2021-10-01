import React from 'react';
import { useHistory } from 'react-router-dom';
import './SavedPlaylistsItem.scss'
import ListGroup from 'react-bootstrap/ListGroup'

function SavedPlaylistsItem({id, name, rating, thumbnail, setPlaylist }) {

  //To forward user to room when Play Playlist button is clicked
  let history = useHistory();
  
  return (

    <ListGroup.Item action variant="Primary" className='playlist__item' onClick={()=> setPlaylist(id)}>
      <img
        className="playlist__image"
        src={thumbnail}
        size
      />
      <div>
        playlist id: {id}  
      </div>

      <div>
        {name}
      </div>

      <div>
        {rating}/10
      </div>

      <button onClick={()=> history.push("/room")}>Play Playlist</button>
     
    </ListGroup.Item>
    
  )
}

export default SavedPlaylistsItem;