import React, { useEffect, useState } from 'react';
import './Home.scss';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import CurrentPlaylist from './CurrentPlaylist/CurrentPlaylist';
import axios from 'axios';


function Home() {
  
  const userId = localStorage.user_id;

  const [playlists, setPlaylists] = useState([]);
  const [medias, setMedias]

  //Get the playlist for the current user (empty array to only run on page load)
  useEffect(() => {
    axios.get(`/api/home/${userId}`)
    .then((response) => {
      setPlaylists(response.data);
    });
  }, [])

  return (

    <div className="home">
      <section className="saved-playlists-container">
        <SavedPlaylists playlists={playlists}/>
      </section>
      <section className="new-playlist-container">
        {/* NEW PLAYLIST ALSO GOES HERE */}
        <CurrentPlaylist/>
      </section>
    </div>
    
  )
}

export default Home;