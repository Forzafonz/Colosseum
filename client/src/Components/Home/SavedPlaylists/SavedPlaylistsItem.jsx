import React from 'react';
import { useHistory } from 'react-router-dom';
import './SavedPlaylistsItem.scss'
import ListGroup from 'react-bootstrap/ListGroup'

function SavedPlaylistsItem({state, id, name, rating, thumbnail, setPlaylist, setPlayingMedia }) {

  //To forward user to room when Play Playlist button is clicked
  let history = useHistory();

  //Enables toggle on playlist to show songs or new playlist form
  const changePlaylistId = (id) => {

    if (state.current_playlist) {
      setPlaylist(null);
    } else {
      setPlaylist(id);
    } 

  }

  //When play is pressed, it updates the states current_media to first media in media object
  // for the selected playlist and redirects to room
  const playPlaylist = (id) => {


    const mediaObjectForPlaylist = state.playlists_for_user[id].media;

    const firstMediaObject = mediaObjectForPlaylist[Object.keys(mediaObjectForPlaylist)[0]];

    setPlayingMedia(firstMediaObject.media_id);

    history.push("/room")

  }

  
  return (

    <>
      <ListGroup.Item action variant="Primary" className='playlist__item' onClick={()=> changePlaylistId(id)}>
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

      
      </ListGroup.Item>
      {state.current_playlist === id && <button onClick={()=> playPlaylist(id)}>Play Playlist</button> }
    </>
    
  )
}

export default SavedPlaylistsItem;