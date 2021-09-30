import {useEffect, useReducer} from 'react';
import reducer, { SET_APPLICATION_DATA, SET_PLAYLIST, SET_PLAYING_MEDIA } from './reducers';
import axios from "axios";

export default function useApplicationData(initial) {

  //state Object =====> { playlists_for_user : {playlists id 1: { media_id 1: {media 1}, media_id 2: {media2} ...}, playlists id 2: { media_id 3: {media 3}, media_id 4: {media4} ...}}}, 
                      //  current_playlist: playlist_id,
                      //  current_media:  link
                      // }

  const initialState = { 
    playlists_for_user: {},
    current_playlist: null,
    current_media: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const userId = localStorage.getItem("user_id");

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
      }
    )
  }, []);


  const setPlaylist = (playlistId) => {
    dispatch({ type: SET_PLAYLIST, values: playlistId })
  };

  const setPlayingMedia = (mediaId) => {

    dispatch({ type: SET_PLAYING_MEDIA, values: mediaId })
  };

  return { state, setPlaylist, setPlayingMedia }
}
