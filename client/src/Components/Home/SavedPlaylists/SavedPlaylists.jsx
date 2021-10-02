import React from 'react';
import SavedPlaylistsItem from './SavedPlaylistsItem';
import ListGroup from 'react-bootstrap/ListGroup'

function SavedPlaylists({ setPlaylist, state, setPlayingMedia, setClicked, clicked }) {

  //Create array of playlists for logged in user
  let playlistsArray = Object.values(state.playlists_for_user);

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
    <>
    <h1>Saved Playlists</h1>
      <ListGroup>
        {savedPlaylists}
      </ListGroup>
    </>
     
 
  
  )
}

export default SavedPlaylists;