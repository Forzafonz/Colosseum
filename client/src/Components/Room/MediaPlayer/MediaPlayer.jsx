import React, {useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function MediaPlayer({state, setNextMedia, elapsedTimeOther, conn }){

  //MIGHT MOVE TO REDUCERS/USEAPPPLICATION DATA ONCE SOCKET.IO
  const findFirstPlayOrderLink = () => {

   
    
    if (state.playlists_for_user[state.current_playlist] && Object.keys(state.playlists_for_user[state.current_playlist].media).length) {
      // console.log("CURRENT PLAYLIST", Object.keys(state.playlists_for_user[state.current_playlist].media).length)
      //object of media for playlist
      const mediaObj = state.playlists_for_user[state.current_playlist].media

      const firstMediaObjKey = Object.keys(mediaObj)[0];
      //Assume first obj is lowest
      let currentPlayOrder = mediaObj[firstMediaObjKey].play_order;
      //Assume first obj is lowest
      let lowestPlayOrderLink = mediaObj[firstMediaObjKey].link;
      //Iterate to find actual lowest
      for (const media in mediaObj) {

        if (mediaObj[media].play_order < currentPlayOrder) {
          currentPlayOrder = mediaObj[media].play_order;
          lowestPlayOrderLink = mediaObj[media].link;
        };
    
      };

      return lowestPlayOrderLink;
    } 

    return null;
  }

  const initialState = findFirstPlayOrderLink();


  const [media, setMedia] = useState(initialState);







  useEffect(() => {
    console.log("Current media:", state, state.current_media)
    if (state.current_media) {

       setMedia(state.playlists_for_user[state.current_playlist].media[state.current_media].link);
    } else {
      setMedia(null)
    }
    
  }, [state.current_media])


  const ref = React.createRef()

  //To update the time of media currently playing based on other window playing
  useEffect(() => {

    //Sets current media players time to whatever time is in elapsedTimeOTher
    ref.current.seekTo(elapsedTimeOther)
    
  }, [elapsedTimeOther])
 

  return (

    <>
      <section className="media-player-container">
        <ReactPlayer
        ref={ref}
        width="100%" 
        height="100%" 
        playing = "true" 
        controls url={media} 
        onEnded={()=> setNextMedia() }
        onProgress = {(test) => conn.emit("playing_time", test.playedSeconds)}
        />
      </section>
    </>
  );
}

export default MediaPlayer;