import React from 'react';
import './CurrentPlaylistItem.scss'

function CurrentPlaylistItem({play_order, media_rating, media_description, media_thumbnail }) {
  
  return (

    // <li className='media__item'>
    //   <img
    //     className="media__image"
    //     src={media_thumbnail}
    //     size
    //     />
    //   <div className>
    //     play order: {play_order}  
    //   </div>

    //   <div className>
    //     desc: {media_description}
    //   </div>

    //   <div className>
    //     rating: {media_rating}
    //   </div>
    //     </li>
    

    <main className = 'listmedia'>
      <div className = "m-item">
      <img
        className="mediaimage"
        src={media_thumbnail}
        size
        />
        </div>
        <div className = "gap"> </div>
        <div className = "items-three">
        <hr></hr>


      <div className = "m-item">
        Play order: {play_order}  
      </div>
      <div className = "m-item">
        Rating: {media_rating}
      </div>

      <div className = "m-item">
        Title: {media_description}
      </div>
      <hr></hr>
        </div>      
    </main>






  )
}

export default CurrentPlaylistItem;