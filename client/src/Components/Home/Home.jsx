import React, { useReducer, useEffect, useState } from 'react';
import SavedPlaylists from './SavedPlaylists/SavedPlaylists';
import NewPlaylist from './NewPlaylist/NewPlaylist';
import './homestyle.scss'

function Home() {
return (

<>
<div className = "saved-new">
<SavedPlaylists>

</SavedPlaylists>
<NewPlaylist>

</NewPlaylist>
</div>
</>
)
}

export default Home;