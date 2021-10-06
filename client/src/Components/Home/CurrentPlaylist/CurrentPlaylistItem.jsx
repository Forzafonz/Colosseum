import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './CurrentPlaylistItem.scss'

function CurrentPlaylistItem({play_order, media_rating, media_description, media_thumbnail }) {
  
  return (

    <div className = 'media-item'>
      
      <img className="media-image" src={media_thumbnail} size />

      <div className = "media-info" >
        <hr></hr>
        <div className = "media-info-line">
          {play_order}. {media_description}
        </div>
        {/* <div className = "media-info-line">
          Rating: {media_rating}/10
        </div> */}
        <hr></hr>
      </div>      

    </div>
  )
}

export default CurrentPlaylistItem;