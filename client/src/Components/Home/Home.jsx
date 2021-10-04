import React, { useEffect, useState } from 'react';
import './Home.scss';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import CurrentPlaylist from './CurrentPlaylist/CurrentPlaylist';
import axios from 'axios';
import NewPlaylist from './NewPlaylist/NewPlaylist';

function Home({state, setPlaylist, updatenewPlaylist, setStale, setPlayingMedia}) {

  // console.log("HOME STATE", state);

  //REMOVE LATER, ONLY USED FOR DISPLAYLING LOGGED IN USER ID ON HOME PAGE
  const userId = localStorage.user_id;

  //Triggers useEffect with new user (useEffect before would only run on initial page render)
  setStale(false);
 
  //Grabs whatever playlist is clicked on 
  const playlistId = state.current_playlist;
  const [clicked, setClicked] = useState(false)

  return (

    <div className="home">
      <section className="saved-playlists-container">
        <br/>
        <SavedPlaylists setPlaylist={setPlaylist} state={state} setPlayingMedia={setPlayingMedia} setClicked = {setClicked} clicked = {clicked}/>
      </section>
      <section className="new-playlist-container">

        {!clicked && <NewPlaylist updatenewPlaylist = {updatenewPlaylist} setPlaylist = {setPlaylist}/>} 
        {clicked && <CurrentPlaylist playlistId={playlistId} state={state}/>}
        
        </section>

    </div>
    
  )
}

export default Home;