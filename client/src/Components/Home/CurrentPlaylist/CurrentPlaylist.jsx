import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import CurrentPlaylistItem from './CurrentPlaylistItem';
// import './CurrentPlaylistItem.scss'
import './CurrentPlaylist.scss'




function CurrentPlaylist({ playlistId, state }) {
 
  //Check if there is a playlist selected and set name accordingly
  const playlistName = state.show_playlist ? state.playlists_for_user[playlistId].playlist.name : "Select Playlist";

  let mediaArray = [];

  //Check if there is a playlist selected
  if (state.show_playlist) {

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

    const sortedCurrentPlaylistItems = currentPlaylistItems.sort((media1, media2) => {
      const media1PlayOrder = media1.props.play_order;
      const media2PlayOrder = media2.props.play_order;
      return media1PlayOrder - media2PlayOrder;
    })



  return (
    <div className = "current-playlist"> 
      <h1 className="heading">{playlistName.toUpperCase()}</h1>
      <ListGroup className = "current-playlist-items-container">
      {sortedCurrentPlaylistItems}
      </ListGroup>
    </div>
  )
}

export default CurrentPlaylist;