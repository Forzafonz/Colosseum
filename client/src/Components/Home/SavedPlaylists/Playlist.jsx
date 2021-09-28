import React, { useReducer, useEffect, useState } from 'react';
import './Playlist.scss'


function Playlist({id, name, rating, thumbnail}) {
  return (

    <li className='playlist__item'>
      <img
        className="playlist__image"
        src={thumbnail}
        size
      />
      <div className>
        {id}  
      </div>

      <div className>
        {name}
      </div>

      <div className>
        {rating}
      </div>
     
      
      
      
      
     
      
      
    </li>
    
  )
}

export default Playlist;