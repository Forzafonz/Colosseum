import React, {useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

function MediaPlayer({state}){

  const [media, setMedia] = useState("https://soundcloud.com/housemusicdj/lets-get-down-house-mix_0715");

  useEffect(() => {

    if (state.current_media) {
      setMedia(state.current_media);
    }
    
  }, [state.current_media])

  return (
    <section className="media-player-container">
       <ReactPlayer width="100%" height="100%" controls url={media} />
    </section>
  );
}

export default MediaPlayer;