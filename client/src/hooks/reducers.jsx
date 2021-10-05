const SET_PLAYLIST = "SET_PLAYLIST";
const SET_PLAYING_MEDIA = "SET_PLAYING_MEDIA";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const ADD_MEDIA_TO_PLAYLIST = "ADD_MEDIA_TO_PLAYLIST";
const REMOVE_MEDIA_FROM_PLAYLIST = "REMOVE_MEDIA_FROM_PLAYLIST";
const UPDATE_NEW_PLAYLIST = "UPDATE_NEW_PLAYLIST";
const SET_NEXT_MEDIA = "SET_NEXT_MEDIA";
const SET_ORDER_FROM_LIKES = 'SET_ORDER_FROM_LIKES';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
const CLEAR_MEDIA = 'CLEAR MEDIA'
const SET_SHOW_PLAYLIST = 'SET_SHOW_PLAYLIST'

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

    const newMessages = {};

    if (action.values.messages !== null) {

      action.values.messages.forEach(element => {
        
        const date = Number(element.date);
        newMessages[date] = {msg: element.text, date: date, user_id : element.user_id, avatar: element.avatar, username: element.username}
      });
    }

    const newState = {...state, playlists_for_user: newPlaylistsForUser, current_playlist: setPlaylist, messages: newMessages}

    return newState;
  }


  //Function to set current playlist
  const setPlaylist = () =>{
    const newState = {...state}
    console.log("I AM CALLDE WITH THIS PLAYLIST", action.values, newState.playlists_for_user[action.values])
    // const updatedState = {...newState, current_playlist: action.values}
    if (action.values && newState.playlists_for_user[action.values]) {
        const updatedMedia = {...newState.playlists_for_user[action.values].media}

        Object.keys(updatedMedia).forEach((element) => {
          return updatedMedia[element].played_already = false
        })
        
        const updatedPlaylist = {...newState.playlists_for_user[action.values], media : updatedMedia };
        
        const updatedPlaylists = {...newState.playlists_for_user, [action.values] : updatedPlaylist  };
        
        const updatedState = { ...newState, playlists_for_user : updatedPlaylists, current_playlist: action.values };
        
        return {...updatedState, current_playlist: action.values};
    } else {

      return {...newState, current_playlist: action.values}
    }
    
  }

  const clearMedia = () => {
    const updatedState = {...state, current_media:null}
    return updatedState;
  }


  //Function to set current media
  const setPlayingMedia = () => {

    console.log("I AM CALLLED WITH THIS ACTIONS", action, state.current_playlist)
    if (action.values.media) {
      return {...state, current_media: action.values.media }    
    } else if (action.values.playlist_id){
      
      const mediaForPlaylisObject = state.playlists_for_user[action.values.playlist_id].media;   

      let min_media_id = 0;
      let min_play_order = 100000;

      if (Object.keys(state.playlists_for_user[action.values.playlist_id].media).length) {

        Object.keys(mediaForPlaylisObject).map((mediaKey) => {
          
          if (mediaForPlaylisObject[mediaKey].play_order < min_play_order) {
            min_play_order = mediaForPlaylisObject[mediaKey].play_order;
            min_media_id = mediaKey
          }
        })
      } else {
        min_media_id = null;
      }
      console.log("THIS IS MEDIA ID IN SPM", min_media_id)
      return {...state, current_media: min_media_id }  

    } else {
      return {...state}
    }


  }

  // Function to add a new media to playlist which was added to queue

  const addMediaToPlaylist = () => {

    
    const newMedia = action.values.media
    const playlist_id = action.values.playlist_id
    const updatedState = {...state}

    // console.log("UPDATED Addmedia state", updatedState);
    // console.log("UPDATED Addmedia plylistID", playlist_id);

    const media_for_playlist = updatedState.playlists_for_user[playlist_id].media

    const updated_playlists_for_user = 
    {...updatedState.playlists_for_user, [playlist_id]:{playlist:{...updatedState.playlists_for_user[playlist_id].playlist}, 
    media:{...media_for_playlist, [newMedia.id] : newMedia}}}
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
    {...updatedState.playlists_for_user, [newPlaylist_id]:{playlist:{id: newPlaylist_id}, media:{}}}
    const newState = {...state, playlists_for_user:updated_playlists_for_user, current_playlist: newPlaylist_id}
    // const setPlaylistState = {...newState, }
    // console.log("=====>newstate", newState);
    return {...newState, current_media:null};

}
//

  const setNextMedia = () => {

    //Set media that just played to played already
    const newState = {...state};

    const updatedMediaPlayedAlready = {...newState.playlists_for_user[state.current_playlist].media[state.current_media], played_already: true};
    
    const updatedMedia = { ...newState.playlists_for_user[state.current_playlist].media, [state.current_media] : updatedMediaPlayedAlready };

    const updatedPlaylist = {...newState.playlists_for_user[state.current_playlist], media : updatedMedia };

    const updatedPlaylists = {...newState.playlists_for_user, [state.current_playlist] : updatedPlaylist  };

    const updatedState = { ...newState, playlists_for_user : updatedPlaylists };

    //Order ones that have not been played yet by play order
    //Get media object for current playlist
    const mediaCurrentPlaylistObject = updatedState.playlists_for_user[state.current_playlist].media;

    //Get keys of object of media for current playlist
    const mediaKeysCurrentPlaylistArray = Object.keys(mediaCurrentPlaylistObject);

    //Return an array of media that has not already been played
    const filterMediaNotAlreadyPlayedArray = mediaKeysCurrentPlaylistArray.filter((index) => {
      return !mediaCurrentPlaylistObject[index].played_already
    })

    //Sort array by playorder
    const sortedMediaByPlayOrderArray = filterMediaNotAlreadyPlayedArray.sort((ele1, ele2) => {

      const ele1PlayOrder = mediaCurrentPlaylistObject[ele1].play_order
      const ele2PlayOrder = mediaCurrentPlaylistObject[ele2].play_order

      return ele1PlayOrder - ele2PlayOrder
    })

    //Get first entry in playorder array
    updatedState.current_media = sortedMediaByPlayOrderArray[0];

    return updatedState;
  }

  //Change play order for playlist based on number of likes 
  const setOrderFromLikes = () => {

    //------Get the current media rating------//
    const newState = {...state};
 
    let currentMediaRating = newState.playlists_for_user[state.current_playlist].media[action.values.mediaId].media_rating + 1
    if (!action.values.like) {
      currentMediaRating = newState.playlists_for_user[state.current_playlist].media[action.values.mediaId].media_rating - 1
    }

    const updatedMediaMediaRating = {...newState.playlists_for_user[state.current_playlist].media[action.values.mediaId], 
                                      media_rating: currentMediaRating};


    const updatedMedia = { ...newState.playlists_for_user[state.current_playlist].media, 
                          [action.values.mediaId] : updatedMediaMediaRating };


    const updatedPlaylist = {...newState.playlists_for_user[state.current_playlist], 
                              media : updatedMedia };

    const updatedPlaylists = {...newState.playlists_for_user, [state.current_playlist] : updatedPlaylist  };

    const updatedState = { ...newState, playlists_for_user : updatedPlaylists };

    
    //-------Filter out played already------//

    //Array of all media keys
    const mediaKeysArray = Object.keys(updatedState.playlists_for_user[state.current_playlist].media)
    const arrayOfMediaObjects = mediaKeysArray.map( media => updatedState.playlists_for_user[state.current_playlist].media[media])
    
    const currentMediaArray = [...arrayOfMediaObjects]
    const arrayOfMediaObjectsNotPlayedAlready = arrayOfMediaObjects.filter( media => media.played_already === false && media.media_id !== state.current_media )
    //------Extracting the playing element from the media Array.
    const currentMedia = currentMediaArray.filter(media => media.media_id === state.current_media)

    //------Update play order based on media rating------//


    //ARRAY OF PLAY ORDER
    // initial array looks like this:                  [11,6,12,7,8,14,13,11,9,10]
    // sort it like this:                              [5,6,7,8,9,10,11,12,13,14]

    const sortedByPlayOrderArrayOfMediaObjectsNotPlayedAlready = arrayOfMediaObjectsNotPlayedAlready.sort((ele1, ele2) => {

      const firstElement = ele1.play_order;
      const secondElement = ele2.play_order;

      return firstElement - secondElement
    })

    

    //array of playorder: [5,6,7,8,9,10,11,12,13,14]
    const intialPlayOrderArray = sortedByPlayOrderArrayOfMediaObjectsNotPlayedAlready.map(mediaObj => mediaObj.play_order );

   

    //Now need to sort by votes (media rating)
    const sortedByVotesArrayOfMediaObjectsNotPlayedAlready = arrayOfMediaObjectsNotPlayedAlready.sort((ele1, ele2) => {

      const firstElement = ele1.media_rating;
      const secondElement = ele2.media_rating;
      //Sort by descending order of votes
      return  secondElement - firstElement;
    })

    //Sorted based on votes (media rating)
    sortedByVotesArrayOfMediaObjectsNotPlayedAlready.forEach((mediaObjElement, mediaObjIndex) => {
      mediaObjElement.play_order = intialPlayOrderArray[mediaObjIndex];
    })


    //------update state based on new play order------//

    // Update stated based on new playorder

    //------Add the previously extracted currently playing media and add it back to the currentMedia array.
    //------This way it does not participate in sorting by votes, thus holds its queue position.
    if (currentMedia.length) {
      sortedByVotesArrayOfMediaObjectsNotPlayedAlready.unshift(currentMedia[0])
    }
  
    sortedByVotesArrayOfMediaObjectsNotPlayedAlready.forEach((ele) => {
     
      updatedState.playlists_for_user[state.current_playlist].media[ele.media_id] = ele;
    })


    return updatedState;
  };

  const addNewMessage = () => {

    const newState = {...state}
    const updatedMessages = {...newState.messages, [action.values.date] : action.values}
    const updatedState = {...newState, messages:updatedMessages}

    return updatedState

  }

  const setShowPlaylist = () => {
    const updatedState = {...state}
    return {...updatedState, show_playlist: action.values}
  }

//
  const actions = {

    [SET_PLAYLIST]: setPlaylist,
    [SET_PLAYING_MEDIA]: setPlayingMedia,
    [SET_APPLICATION_DATA] : setApplicationData,
    [ADD_MEDIA_TO_PLAYLIST] : addMediaToPlaylist,
    [REMOVE_MEDIA_FROM_PLAYLIST] : removeMediaFromPlayList, 
    [UPDATE_NEW_PLAYLIST] : updatenewPlaylist,
    [SET_NEXT_MEDIA] : setNextMedia,
    [SET_ORDER_FROM_LIKES] : setOrderFromLikes,
    [ADD_NEW_MESSAGE]:addNewMessage,
    [CLEAR_MEDIA]: clearMedia,
    [SET_SHOW_PLAYLIST] : setShowPlaylist,
  
    "default": () => {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`)}
  }

  return actions[action.type] ? actions[action.type](action) : actions["default"]()

}

export { reducer as default, 
  SET_APPLICATION_DATA, 
  SET_PLAYLIST, 
  SET_PLAYING_MEDIA, 
  ADD_MEDIA_TO_PLAYLIST, 
  UPDATE_NEW_PLAYLIST, 
  REMOVE_MEDIA_FROM_PLAYLIST, 
  SET_NEXT_MEDIA, 
  SET_ORDER_FROM_LIKES,
  ADD_NEW_MESSAGE,
  CLEAR_MEDIA,
  SET_SHOW_PLAYLIST 
};
