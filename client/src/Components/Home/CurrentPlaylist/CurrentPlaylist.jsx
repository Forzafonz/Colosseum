import React, { useReducer, useEffect, useState } from 'react';
import MediaForCurrentPlaylist from './MediaForCurrentPlaylist';

function CurrentPlaylist({ medias, playlistId }) {
  //TEMPORARY (use state, passed down as props to this component from App.js)
  // THIS IS A COMBO OF playlists_media and media tables
  // playlist_id, media_id, play_order and media_rating from playlists_media
  // media_description and media_thumbnail from media

  // const playListId = 3;

  const mediaArray = medias.filter(media => media.playlist_id === playlistId);
  
  console.log("MEDIA IN ALL USER PLAYLIST:", medias);
  console.log("MEDIA IN CURRENT PLAYLIST:", mediaArray);


  // const mediaArray = [
  //   {
  //     playlist_id: 1,
  //     media_id: 1,
  //     play_order: 1,
  //     media_rating: 3,
  //     media_description: 'desc1',
  //     media_thumbnail: "https://images-prod.healthline.com/hlcmsresource/images/Dog-Breeds-Health-Problems/3180-Pug_green_grass-1284x400-BANNER10.jpg"
  //   },
  //   {
  //     playlist_id: 1,
  //     media_id: 2,
  //     play_order: 2,
  //     media_rating: 4,
  //     media_description: 'desc1',
  //     media_thumbnail: "https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
  //   },
  //   {
  //     playlist_id: 1,
  //     media_id: 3,
  //     play_order: 3,
  //     media_rating: 1,
  //     media_description: 'desc1',
  //     media_thumbnail: "https://thumbs.dreamstime.com/b/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg"
  //   },
  //   {
  //     playlist_id: 1,
  //     media_id: 4,
  //     play_order: 4,
  //     media_rating: 6,
  //     media_description: 'desc1',
  //     media_thumbnail: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
  //   }
  // ];

  const currentPlaylist = mediaArray.map( (media) => 
    <MediaForCurrentPlaylist
      playlist_id = {media.playlist_id}
      media_id = {media.media_id}
      play_order = { media.play_order}
      media_rating = {media.media_rating}
      media_description = {media.description}
      media_thumbnail = {media.thumbnail}
    />);

  return (

    <ul>
      PLAYLIST ID: {playlistId}
      {currentPlaylist}
    </ul>
  
  )
}

export default CurrentPlaylist;