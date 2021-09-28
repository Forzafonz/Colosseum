import React, { useReducer, useEffect, useState } from 'react';
import Playlist from './Playlist';

function SavedPlaylists({playlists}) {
  //TEMPORARY (use state, passed down as props to this component from App.js)
  // id, name, rating and thumbnail from playlists table. 
  // user id from users_playlists table

  // const playlistsArray = [
  //   {
  //     id: 1,
  //     name: "PL-1",
  //     rating: 4,
  //     thumbnail: "https://assets.smoothradio.com/2017/26/ed-sheeran-1498662806-editorial-short-form-0.jpg",
  //     user_id: 1
  //   },
  //   {
  //     id: 2,
  //     name: "PL-2",
  //     rating: 5,
  //     thumbnail: "https://media1.popsugar-assets.com/files/thumbor/wNhs3Orm_ob0T6fsFhqfRgMRCEw/1346x474:4298x3426/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/10/31/972/n/1922283/b80874af5dbb5e357a48b0.76757692_/i/Best-Young-Music-Artists-2019.jpg",
  //     user_id: 1
  //   },
  //   {
  //     id: 3,
  //     name: "PL-3",
  //     rating: 4,
  //     thumbnail: "https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-1014868608.jpg?itok=eLyDCDbM",
  //     user_id: 1
  //   }
  // ];

  const playlistsArray = playlists;

  const savedPlaylists = playlistsArray.map( (playlist) => 
  <Playlist
    id = {playlist.id}
    name = {playlist.name}
    rating = { playlist.rating}
    thumbnail = {playlist.thumbnail} 
  />);

  return (

    <ul>
      {savedPlaylists}
    </ul>
  
  )
}

export default SavedPlaylists;