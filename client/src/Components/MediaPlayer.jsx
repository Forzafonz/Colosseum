import React from 'react';
import ReactPlayer from 'react-player'

function MediaPlayer({media}){
  return (
    <section className="media-player-container">
       <ReactPlayer width="100%" height="100%" controls url={media} />
    </section>
  );
}

export default MediaPlayer;