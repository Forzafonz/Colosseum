import React, { useEffect, useState } from 'react';
import './Home.scss';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import CurrentPlaylist from './CurrentPlaylist/CurrentPlaylist';
import axios from 'axios';
import NewPlaylist from './NewPlaylist/NewPlaylist';
// import useApplicationData from '../../hooks/useApplicationData'

function Home({state, setPlaylist, updatenewPlaylist}) {

  console.log("HOME STATE", state);

  const userId = localStorage.user_id;

  const [playlists, setPlaylists] = useState([]);
  const [medias, setMedias] = useState([]);
  const [playlistId, setPlaylistId] = useState();

  //Get the playlists for the current user (empty array to only run on page load)
  useEffect(() => {
    axios.get(`/api/home/${userId}/playlists`)
    .then((response) => {
      setPlaylists(response.data);
  
    });
  }, [])

  //Get the medias for the current user (empty array to only run on page load)
  //Medias is all the media associated with every playlist for the logged in user
  useEffect(() => {
    axios.get(`/api/home/${userId}/media`)
    .then((response) => {
      setMedias(response.data);
    });
  }, [])

  //Get selected playlist (whichever one is selected by user)
  const playlist = playlists.find(playlist => playlist.id === playlistId);
  //Get selected playlist name (for use as header in CurrentPlaylist component)

  const playlistName = playlist ? playlist.name : "Choose a playlist";

  return (

    <div className="home">
      <section className="saved-playlists-container">
        CURRENT USER ID LOGGED IN: {userId}
        <SavedPlaylists playlists={playlists} setPlaylistId={setPlaylistId}/>
      </section>
      <section className="new-playlist-container">
        

        {!playlistId && <NewPlaylist updatenewPlaylist = {updatenewPlaylist}/>} 
        {playlistId && <CurrentPlaylist medias={medias} playlistId={playlistId} playlistName={playlistName}/>}
        
        </section>



    </div>
    
  )
}

export default Home;