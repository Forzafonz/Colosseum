import React, { useReducer, useEffect, useState } from 'react';
import './SavedPlaylistsItem.scss'
import ListGroup from 'react-bootstrap/ListGroup'


function SavedPlaylistsItem({id, name, rating, thumbnail, setPlaylistId }) {
  return (

    <ListGroup.Item action variant="Primary" className='playlist__item' onClick={()=> setPlaylistId(id)}>
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

      <button onClick={()=> console.log(`redirect to playlist ${id}`)}>PLAY</button>
     
    </ListGroup.Item>
    
  )
}

export default SavedPlaylistsItem;