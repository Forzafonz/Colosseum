import React from 'react';
import SavedPlaylistsItem from './SavedPlaylistsItem';
import ListGroup from 'react-bootstrap/ListGroup'
import './SavedPlaylists.scss'

function SavedPlaylists({ setPlaylist, state, setPlayingMedia, setClicked, clicked }) {

  //Create array of playlists for logged in user
  let playlistsArray = Object.values(state.playlists_for_user);
  // console.log("Home state", state)


  //Create array of components
  let savedPlaylists = playlistsArray.map( (playlist) => 
  <SavedPlaylistsItem
    state = {state}
    id = {playlist.playlist.id}
    name = {playlist.playlist.name}
    rating = { playlist.playlist.rating}
    thumbnail = {playlist.playlist.thumbnail} 
    setPlaylist={setPlaylist}
    setPlayingMedia={setPlayingMedia}
    setClicked = {setClicked}
    clicked = {clicked}
  />);

  return (
    <div className = "saved_playlist">
      <h1 className="heading">YOUR PLAYLISTS</h1>
      <ListGroup className = "saved_playlist_items_container">
        {/* <ListGroup horizontal>

        <ListGroup.Item       action
        variant="info"
        className="playlist__item"
       >
          <div>Image</div>
          <div>Rating</div>
          <div>Playlist Id</div>
          <div>Playlist name</div>
        </ListGroup.Item>
        </ListGroup> */}

        {savedPlaylists}
      </ListGroup>
    </div>
     
 
  
  )
}

export default SavedPlaylists;