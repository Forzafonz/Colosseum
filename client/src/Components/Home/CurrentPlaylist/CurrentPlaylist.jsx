import React from 'react';

import CurrentPlaylistItem from './CurrentPlaylistItem';


function CurrentPlaylist({ playlistId, state }) {
 
  //Check if there is a playlist selected and set name accordingly
  const playlistName = state.current_playlist ? state.playlists_for_user[playlistId].playlist.name : "Select Playlist";

  let mediaArray = [];

  //Check if there is a playlist selected
  if (state.current_playlist) {

    // If there is, create array of media_id keys
    const mediaKeysForActivePlaylistArray = Object.keys(state.playlists_for_user[playlistId].media);

    // Create array of media for current playlist
    mediaArray = mediaKeysForActivePlaylistArray.map((mediaKey) => {
      return state.playlists_for_user[playlistId].media[mediaKey]
    })
    
  };

  //Create component from the raw media info
  const currentPlaylistItems = mediaArray.map( (media) => 
    <CurrentPlaylistItem
      playlist_id = {media.playlist_id}
      media_id = {media.media_id}
      play_order = { media.play_order}
      media_rating = {media.media_rating}
      media_description = {media.description}
      media_thumbnail = {media.thumbnail}
    />);

  return (
    <>
      PLAYLIST ID: {playlistId}
      <h1>{playlistName}</h1>
      <ul>
        
        {currentPlaylistItems}
      </ul>
  

    </>
   
  )
}

export default CurrentPlaylist;