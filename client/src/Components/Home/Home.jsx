import React, { useReducer, useEffect, useState } from 'react';
import './Home.scss';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import CurrentPlaylist from './CurrentPlaylist/CurrentPlaylist';


function Home() {
  return (

    <div className="home">
      <section className="saved-playlists-container">
        <SavedPlaylists/>
      </section>
      <section className="new-playlist-container">
        {/* NEW PLAYLIST ALSO GOES HERE */}
        <CurrentPlaylist/>
      </section>
    </div>
    
  )
}

export default Home;