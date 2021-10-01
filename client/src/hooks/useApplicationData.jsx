import {useEffect, useReducer, useState } from 'react';
import reducer, { SET_APPLICATION_DATA, SET_PLAYLIST, SET_PLAYING_MEDIA, SET_USER_ID } from './reducers';
import axios from "axios";

export default function useApplicationData(initial) {

  //state Object old =====> { playlists_for_user : {playlists id 1: { media_id 1: {media 1}, media_id 2: {media2} ...}, playlists id 2: { media_id 3: {media 3}, media_id 4: {media4} ...}}}, 
                      //  current_playlist: playlist_id,
                      //  current_media:  link
                      // }

   //state Object new =====> { playlists_for_user :   {playlists id 1: {playlist : { all playlist details }, media :{ media_id 1: {media details}, media_id 2: {media details} ...}}, 
                                                 //   {playlists id 2: {playlist : { all playlist details }, media :{ media_id 1: {media details}, media_id 2: {media details} ...}}...} 
                          //      current_playlist:   playlist_id,
                          //         current_media:   link
                          // }

  const userId = localStorage.getItem("user_id");

  const initialState = { 
    playlists_for_user: {},
    current_playlist: null,
    current_media: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [stale, setStale] = useState(false);


  // useLayoutEffect?

  // Called on initial launch to retrieve information from the database
  useEffect(() => {
    // /api/home/${userId}/playlists is an array of objects
    // /api/home/${userId}/media is an array of objects
    Promise.all([
      axios.get(`/api/home/${userId}/playlists`),
      axios.get(`/api/home/${userId}/media`)  
    ])
    .then(
      (result) => {
        const [userPlaylists, userMedias] = result;
        dispatch({ type: SET_APPLICATION_DATA, values : { userPlaylists: userPlaylists.data ? userPlaylists.data : [] , userMedias: userMedias.data ? userMedias.data : [] } })
        console.log(state.user_id);
        setStale(false);
      }
    )
  }, [stale]);

  const setPlaylist = (playlistId) => {
    dispatch({ type: SET_PLAYLIST, values: playlistId })
  };

  const setPlayingMedia = (mediaId) => {

    dispatch({ type: SET_PLAYING_MEDIA, values: mediaId })
  };

  //Passed to App.js and passed down to each component from there
  return { state, setPlaylist, setPlayingMedia, setStale }
}
