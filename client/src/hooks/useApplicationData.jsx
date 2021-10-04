import {useEffect, useReducer, useState} from 'react';
import { io } from "socket.io-client"
import reducer, { 
  SET_APPLICATION_DATA, 
  SET_PLAYLIST, 
  SET_PLAYING_MEDIA, 
  ADD_MEDIA_TO_PLAYLIST, 
  REMOVE_MEDIA_FROM_PLAYLIST,
  UPDATE_NEW_PLAYLIST,
  SET_NEXT_MEDIA,
  SET_ORDER_FROM_LIKES,
  ADD_NEW_MESSAGE
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
    current_media: null,
    messages: { msg: "Placeholder", sent: "Placeholder", date: Date.now()}

  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [conn, setConn] = useState(undefined);
  const [stale, setStale] = useState(false);


  // useLayoutEffect?

  // Called on initial launch to retrieve information from the database
  useEffect(() => {
    // /api/home/${userId}/playlists is an array of objects
    // /api/home/${userId}/media is an array of objects
    Promise.all([
      axios.get(`/api/home/${userId}/playlists`),
      axios.get(`/api/home/${userId}/media`),
      axios.get(`/api/home/${userId}/activeplaylist`),
      axios.get(`/api/messages/${userId}`) 
    ])
    .then(
      (result) => {
       
        const [userPlaylists, userMedias, activePlaylist, chatMessages] = result;
       
        dispatch({ type: SET_APPLICATION_DATA, values : { userPlaylists: userPlaylists.data ? userPlaylists.data : [] , 
            userMedias: userMedias.data ? userMedias.data : [], 
            current_playlist: activePlaylist.data ?  activePlaylist.data : null,
            messages: chatMessages.data ? chatMessages.data : null
          } })
        setStale(false);
      }
    )
  }, [stale]);

  ////// SOCKET IO IMPLEMENTATION

  useEffect(() => {
    const socket = io('http://localhost:8000');
    setConn(socket);
  }, [])

  useEffect(() => {
    if (conn) {
      console.log(conn)
      //check if message chat is "UPDATE_CHAT" and dispatch
      conn.on("UPDATE_CHAT", data => {
        dispatch({ type : ADD_NEW_MESSAGE, values : data.msg})
      
      conn.on("play_media", data => {
        console.log("i am here with data", data)
        dispatch({ type: SET_PLAYING_MEDIA, values: {media: data.media,  playlist_id: data.playlistId }})
      })
      })
    
      return () => {
        conn.disconnect();
      };

    }
  }, [conn])


  /////////////////END OF SOCKET IO IMPLEMENTATION////////////////

  const setPlaylist = (playlistId) => {
    if (!state.current_playlist) {
    axios.put(`/api/home/${userId}/playlists/${state.current_playlist}/active`)
    }
    dispatch({ type: SET_PLAYLIST, values: playlistId })
    if (playlistId) {
      axios.put(`http://localhost:8000/api/room/${userId}/playlist/${playlistId}/startplaylist`)
    }
  };

  const setPlayingMedia = (mediaId) => {

      conn.emit("play_media", {
        playlistId: state.current_playlist,
        media: mediaId
      })
   
    
    dispatch({ type: SET_PLAYING_MEDIA, values: {media: mediaId, playlist_id: state.current_playlist}})
  };

  const addMediaToPlaylist = (data) =>{
   
    axios.put('http://localhost:8000/api/addmedia', { data }).then((res) => {
     
      dispatch({type: ADD_MEDIA_TO_PLAYLIST, values : {media : res.data, playlist_id: state.current_playlist}})
        if (state.current_media === null) {
          dispatch({ type: SET_PLAYING_MEDIA, values: {media: res.data.media_id}})
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
    axios.put(`http://localhost:8000/api/room/${userId}/playlist/${state.current_playlist}/media/${state.current_media}`)
  }


  const setOrderFromLikes = (mediaId, like) => {

    dispatch({type: SET_ORDER_FROM_LIKES, values: {mediaId, like}})

  };

  const addMessage = (message) => {
    //  Send a put request to add a new message
    return axios.put('/api/messages/new', {message})
    .then((result) => {
      // Dispathing a command to reducer with type 'newmessage'. Message argument already have a form of {type: ..., value: ...}
      dispatch({type: ADD_NEW_MESSAGE, values: message.values})
    })
    .catch((error) => console.log(error.response.data))
  
  }

  //Passed to App.js and passed down to each component from there
  return { state, setPlaylist, 
    setPlayingMedia, 
    addMediaToPlaylist, 
    updatenewPlaylist, 
    removeMediaFromPlaylist, 
    setStale, 
    setNextMedia, 
    setOrderFromLikes,
    addMessage }
}
