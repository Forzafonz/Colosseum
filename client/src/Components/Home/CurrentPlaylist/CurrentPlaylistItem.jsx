import React from 'react';
import './CurrentPlaylistItem.scss'

function CurrentPlaylistItem({play_order, media_rating, media_description, media_thumbnail }) {
  
  return (

    <li className='media__item'>
      <img
        className="media__image"
        src={media_thumbnail}
        size
      />
      <div className>
        play order: {play_order}  
      </div>

      <div className>
        desc: {media_description}
      </div>

      <div className>
        rating: {media_rating}
      </div>
    
    </li>
    
  )
}

export default CurrentPlaylistItem;