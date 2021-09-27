import React from 'react';

function MediaQue({setMedia, mediaList}){


  let playingMedia = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  
  //TEMPORARY TO SHOW FUNCTIONALITY OF VIDEO PLAYER, WILL BE REPLACED BY QUE
  if (mediaList.length) {
    //Get random song index 
    let randomSongIndex = Math.floor(Math.random() * mediaList.length);

    console.log("SONG INDEX", randomSongIndex);
    console.log("MEDIALIST", mediaList);

    // Pick random song from the song DB
    playingMedia = mediaList[randomSongIndex].link

  }
  
  return (
    <section className="media-que-container">
       MEDIA QUE GOES HERE
       {/* TEMPORARY TO SHOW FUNCTIONALITY OF VIDEO PLAYER, WILL BE REPLACED BY QUE */}
       <button onClick={() => setMedia(playingMedia)}>RANDOM MEDIA FROM DB</button>
    </section>
  );
}

export default MediaQue;