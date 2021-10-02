import React, {useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function MediaPlayer({state, setNextMedia}){

 


  const [media, setMedia] = useState(state.playlist ? state.playlists_for_user[state.current_playlist].media[state.current_media].link : null);



  useEffect(() => {

    console.log("mediaplayer:", state.playlists_for_user[state.current_playlist])
    if (state.current_media) {
      setMedia(state.playlists_for_user[state.current_playlist].media[state.current_media].link);
    }
    
  }, [state])

  return (
    <section className="media-player-container">
       <ReactPlayer width="100%" height="100%" controls url={media} onEnded={()=> setNextMedia()} />
    </section>
  );
}

export default MediaPlayer;