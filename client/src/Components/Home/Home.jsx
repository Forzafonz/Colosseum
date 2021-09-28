import React, { useEffect, useState } from 'react';
import './Home.scss';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import CurrentPlaylist from './CurrentPlaylist/CurrentPlaylist';
import axios from 'axios';

function Home() {
  
  const userId = localStorage.user_id;

  const [playlists, setPlaylists] = useState([]);
  const [medias, setMedias] = useState([]);
  const [playlistId, setPlaylistId] = useState(0);

  //Get the playlists for the current user (empty array to only run on page load)
  useEffect(() => {
    axios.get(`/api/home/${userId}/playlists`)
    .then((response) => {
      setPlaylists(response.data);
      console.log("PLAYLISTS",response.data)
  
    });
  }, [])

  //Get the medias for the current user (empty array to only run on page load)
  useEffect(() => {
    axios.get(`/api/home/${userId}/media`)
    .then((response) => {
      setMedias(response.data);
      console.log("MEDIAS",response.data)
    });
  }, [])

  return (

    <div className="home">
      <section className="saved-playlists-container">
        CURRENT LOGGED IN: {userId}
        <SavedPlaylists playlists={playlists} setPlaylistId={setPlaylistId}/>
      </section>
      <section className="new-playlist-container">
        {/* NEW PLAYLIST ALSO GOES HERE */}
        <CurrentPlaylist medias={medias} playlistId={playlistId}/>
      </section>
    </div>
    
  )
}

export default Home;