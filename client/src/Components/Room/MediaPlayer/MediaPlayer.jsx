import React, {useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function MediaPlayer({state, setNextMedia}){

 

  const initialState = state.playlist ? state.playlists_for_user[state.current_playlist].media[state.current_media].link : null

  const [media, setMedia] = useState(initialState);



  useEffect(() => {

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