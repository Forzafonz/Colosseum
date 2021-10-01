const SET_PLAYLIST = "SET_PLAYLIST";
const SET_PLAYING_MEDIA = "SET_PLAYING_MEDIA";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const ADD_MEDIA_TO_PLAYLIST = "ADD_MEDIA_TO_PLAYLIST";
const REMOVE_MEDIA_FROM_PLAYLIST = "REMOVE_MEDIA_FROM_PLAYLIST";
const UPDATE_NEW_PLAYLIST = "UPDATE_NEW_PLAYLIST";

// A reducer function

const reducer = function (state, action) {

  const setApplicationData = () => {
    const setPlaylist = action.values.current_playlist ? action.values.current_playlist.playlist_id : null
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
  
    const newState = {...state, playlists_for_user: newPlaylistsForUser, current_playlist: setPlaylist}
    console.log("Here is a new state in init:", newState)

    return newState;
  }


  //Function to set current playlist
  const setPlaylist = () =>{
    const newState = {...state}
    const updatedState = {...newState, current_playlist: action.values}
    return updatedState;

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
    const media_for_playlist = updatedState.playlists_for_user[playlist_id].media
    const updated_playlists_for_user = 
    {...updatedState.playlists_for_user, [playlist_id]:{playlist:{}, media:{...media_for_playlist, [newMedia.id] : newMedia}}}
    const newState = {...state, playlists_for_user:updated_playlists_for_user}
    return newState;
  }

  const removeMediaFromPlayList = () =>{
    const playlist_id = action.values.playlist_id;
    const updatedState = {...state};
    const mediaIdToDelete = action.values.id;
 
    const media_of_playlist_to_update = state['playlists_for_user'][playlist_id]['media'];
    const newMediaList = {}
    Object.keys(media_of_playlist_to_update).map(keyMedia => {
      // console.log("bdaf", mediaIdToDelete, media_of_playlist_to_update[keyMedia]['media_id'] , media_of_playlist_to_update[keyMedia]['media_id'] !== mediaIdToDelete)
      if (media_of_playlist_to_update[keyMedia]['media_id'] !== mediaIdToDelete){
        
        return newMediaList[keyMedia] = media_of_playlist_to_update[keyMedia]
      }

    })
    const updated_playlist = {...updatedState.playlists_for_user[playlist_id], media: newMediaList}
    const updated_playlists_for_user = 
    {...updatedState.playlists_for_user, [playlist_id]:updated_playlist}
    const newState = {...state, playlists_for_user:updated_playlists_for_user}
 
    return newState;
  }
//
const updatenewPlaylist = () => {

  const newPlaylist_id = action.values.playlist_id;
  const updatedState = {...state}
    const updated_playlists_for_user = 
    {...updatedState.playlists_for_user, [newPlaylist_id]:{playlist:{}, media:{}}}
    const newState = {...state, playlists_for_user:updated_playlists_for_user, current_playlist: newPlaylist_id}
    // const setPlaylistState = {...newState, }
    console.log("=====>newstate", newState);
    return newState;

}
//
  const actions = {

    [SET_PLAYLIST]: setPlaylist,
    [SET_PLAYING_MEDIA]: setPlayingMedia,
    [SET_APPLICATION_DATA] : setApplicationData,
    [ADD_MEDIA_TO_PLAYLIST] : addMediaToPlaylist,
    [REMOVE_MEDIA_FROM_PLAYLIST] : removeMediaFromPlayList, 
    [UPDATE_NEW_PLAYLIST] : updatenewPlaylist,
  
    "default": () => {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`)}
  }

  return actions[action.type] ? actions[action.type](action) : actions["default"]()

}

export { reducer as default, SET_APPLICATION_DATA, SET_PLAYLIST, SET_PLAYING_MEDIA, ADD_MEDIA_TO_PLAYLIST, UPDATE_NEW_PLAYLIST, REMOVE_MEDIA_FROM_PLAYLIST };
