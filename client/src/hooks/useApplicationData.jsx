import {useEffect, useReducer, useState} from 'react';
import reducer, { 
  SET_APPLICATION_DATA, 
  SET_PLAYLIST, 
  SET_PLAYING_MEDIA, 
  ADD_MEDIA_TO_PLAYLIST, 
  REMOVE_MEDIA_FROM_PLAYLIST,
  UPDATE_NEW_PLAYLIST,
  SET_NEXT_MEDIA
} from './reducers';
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
      axios.get(`/api/home/${userId}/media`),
      axios.get(`/api/home/${userId}/activeplaylist`)  
    ])
    .then(
      (result) => {
       
        const [userPlaylists, userMedias, activePlaylist] = result;
        console.log('I RUN!', activePlaylist)
        dispatch({ type: SET_APPLICATION_DATA, values : { userPlaylists: userPlaylists.data ? userPlaylists.data : [] , 
            userMedias: userMedias.data ? userMedias.data : [], 
            current_playlist: activePlaylist.data ?  activePlaylist.data : null} })
        setStale(false);
      }
    )
  }, [stale]);

  const setPlaylist = (playlistId) => {
    dispatch({ type: SET_PLAYLIST, values: playlistId })
  };

  const setPlayingMedia = (mediaId) => {
    dispatch({ type: SET_PLAYING_MEDIA, values: mediaId })
    axios.put(`http://localhost:8000/api/home/${userId}/playlists/${state.current_playlist}/active`)
  };

  const addMediaToPlaylist = (data) =>{
    console.log("DAATAAAAAA", data);
    axios.put('http://localhost:8000/api/addmedia', { data }).then((res) => {
      console.log("This is data!", res.data)
      dispatch({type: ADD_MEDIA_TO_PLAYLIST, values : {media : res.data, playlist_id: data.playlist_id}})
        if (state.current_media === null) {
          dispatch({ type: SET_PLAYING_MEDIA, values: res.data.media_id})
        }
    });
  }

  const removeMediaFromPlaylist = (id) =>{

    //Remove it when current playlist is set up properly
    if (state.current_playlist === null){
      state.current_playlist = 6;
    }
    //REMOVE UP TO THIS LINE
    
    dispatch({type: REMOVE_MEDIA_FROM_PLAYLIST, values : {id, playlist_id: state.current_playlist}})

  }

  const updatenewPlaylist = (data) => {
    let newURL ="";



    axios
    .put('http://localhost:8000/api/createplaylist', { data })
    .then((res) => {
      newURL = res.data[0].url;
      alert(`Playlist created successfully. Link to playlist is http://localhost:3000/playlist/${newURL}`);
      // dispatch({ type: SET_PLAYLIST, values: res.data[0].id})
      dispatch({type: UPDATE_NEW_PLAYLIST, values: {playlist_id: res.data[0].id}})
      // if (state.current_playlist === null) {
      //   console.log("I do my job!!")
      // }
    });
  }

  const setNextMedia = () => {
    dispatch({type: SET_NEXT_MEDIA, values: {}})
  }



  //Passed to App.js and passed down to each component from there
  return { state, setPlaylist, setPlayingMedia, addMediaToPlaylist, updatenewPlaylist, removeMediaFromPlaylist, setStale, setNextMedia }
}
