import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SavedPlaylistsItem.scss';
import {ListGroup, Button} from 'react-bootstrap';

function SavedPlaylistsItem({
  state,
  id,
  name,
  rating,
  thumbnail,
  setPlaylist,
  setPlayingMedia,
  setClicked,
  clicked,
  setShowPlaylist
}) {
  //To forward user to room when Play Playlist button is clicked
  let history = useHistory();
  // Local state for the playlistitem which defines whether or not the button is shown. This state is local to THIS PARTICULAR ELEMENT ONLY
  const [compClicked, setCompClicked] = useState(false);

  // setClicked - is a setter method for "GLOBAL HOME State" which defines whether or not newPlaylistForm is shown

  //Enables toggle on playlist to show songs or new playlist form
  const changePlaylistId = (id) => {
    if (!compClicked) {
      setClicked(true);
      setCompClicked(true);
      setShowPlaylist(id)
    } else {
      setClicked(false);
      setCompClicked(!compClicked);
    }
  };
  // Runs to set all other elements local state to compCLicked === false, so that no button is shown.
  useEffect(() => {
    if (state.show_playlist !== id && compClicked) {
      setCompClicked(false);
    }
  }, [state.show_playlist ]);

  //When play is pressed, it updates the states current_media to first media in media object
  // for the selected playlist and redirects to room
  const playPlaylist = (id) => {
    // const mediaObjectForPlaylist = state.playlists_for_user[id].media;
    console.log("id in playPlaylist", id)
    // const firstMediaObject = mediaObjectForPlaylist[Object.keys(mediaObjectForPlaylist)[0]];
    setPlaylist(id);
    // firstMediaObject ? setPlayingMedia(firstMediaObject.media_id) : setPlayingMedia(null)
    // setPlayingMedia(null);

    history.push('/room');
  };

  return (
    <>
      <ListGroup.Item
        action
        variant="Primary"
        className="playlist__item"
        onClick={() => changePlaylistId(id)}
      >
        <div className = "savedplayliststyle">

              <div><img className="playlist__image" src={thumbnail} size /></div>
              <div className = "emptydiv"></div>
              <div className = "saved3">
                <hr/>
              <div>Playlist No: {id}</div>
              <div>Playlist Name: {name}</div>
              <div>No. of items: {Object.keys(state.playlists_for_user[id].media).length}</div>
              
              <hr/>

              </div>
      {compClicked && (
        <Button className = "play-button" variant = "warning" onClick={() => playPlaylist(id)}>Play Playlist</Button>
        )}
        </div>
      </ListGroup.Item>

    </>
  );
}

export default SavedPlaylistsItem;
