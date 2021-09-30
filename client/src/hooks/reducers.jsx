const SET_PLAYLIST = "SET_PLAYLIST";
const SET_PLAYING_MEDIA = "SET_PLAYING_MEDIA";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const ADD_MEDIA_TO_PLAYLIST = "ADD_MEDIA_TO_PLAYLIST";

// A reducer function

const reducer = function (state, action) {

  const setApplicationData = () => {

    //Initialize empty newState
    const newPlaylistsForUser = {};
     
    
    //Setup keys with empty objects for each playlist id
    action.values.userPlaylists.forEach((playlist) => {

      // newPlaylistsForUser[playlist.id] = {};
      newPlaylistsForUser[playlist.id] = { 
        playlist: { ...playlist }, 
        media: {} 
      };

    })

    //Populate playlist keys with media 
    action.values.userMedias.forEach((media) => {

      // newPlaylistsForUser[media.playlist_id] = { ...newPlaylistsForUser[media.playlist_id], [media.media_id] : {...media} }
      newPlaylistsForUser[media.playlist_id]["media"] = { 
        ...newPlaylistsForUser[media.playlist_id]["media"], 
        [media.media_id] : {...media} 
      };
      
    })

  

    
    const newState = {...state, playlists_for_user: newPlaylistsForUser }

    console.log("!!!!!!newSTATE!!!!!!", newState);

    return newState;
  }


  //Function to set current playlist
  const setPlaylist = () =>{

    return {...state, current_playlist: action.values}

  }

  //Function to set current media
  const setPlayingMedia = () => {

    return {...state, current_media: action.values }
  }

  // Function to add a new media to playlist which was added to queue

  const addMediaToPlaylist = () => {

    const newMedia = action.values.media
    const playlist_id = action.values.playlist_id
    const updatedState = {...state}
    const updated_playlists_for_user = 
    {...updatedState.playlists_for_user, [playlist_id]:{playlist:{}, media:newMedia}}
    const newState = {...state, playlists_for_user:updated_playlists_for_user}
    return newState;
  }

  const actions = {

    [SET_PLAYLIST]: setPlaylist,
    [SET_PLAYING_MEDIA]: setPlayingMedia,
    [SET_APPLICATION_DATA] : setApplicationData,
    [ADD_MEDIA_TO_PLAYLIST] : addMediaToPlaylist,
  
    "default": () => {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`)}
  }

  return actions[action.type] ? actions[action.type](action) : actions["default"]()

}

export { reducer as default, SET_APPLICATION_DATA, SET_PLAYLIST, SET_PLAYING_MEDIA, ADD_MEDIA_TO_PLAYLIST };