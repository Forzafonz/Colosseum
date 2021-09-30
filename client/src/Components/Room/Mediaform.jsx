import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './mediaform.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Mediaform() {
  const params = useParams();
  const [url, setUrl] = useState(''); //url to be added to playlist
  const [category, setCategory] = useState('youtube'); //youtube or soundcloud
  const [desc, setDesc] = useState(''); //Description for media
  const [playlistName, setPlaylistName] = useState(''); 
  const [currentplaylist_id, setCurrentplaylistId] = useState('');

  //Gets playlist data from url
  useEffect(() => {
    const data = params.url;
    axios
      .put('http://localhost:8000/api/searchPlaylist', { data })
      .then((res) => {
        console.log('======>res', res.data[0].id);

        setCurrentplaylistId(res.data[0].id);
        setPlaylistName(res.data[0].name);
      });
  }, []);

//To add media to playlist
  const addMedia = () => {

    const playlist_id = currentplaylist_id;
    const data = {
      url,
      category,
      playlist_id,
      desc,
    };

    axios.put('http://localhost:8000/api/addmedia', { data }).then((res) => {
      alert('Playlist updated');
      setUrl('');
      setDesc('');
    });
  };

  return (
    <div className="new-p-container">
      <br/>      

      <h1 className ="h-pl">Playlist </h1>
      <h1 className ="h-name">{playlistName} </h1>
      <br/>


      <table name="new-table">
        <tr>
          <td>
            <label>Select category</label>
          </td>
          <td>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="youtube">Youtube</option>
              <option value="soundcloud">Soundcloud</option>
            </select>
          </td>
        </tr>
        <br></br>
        {/* <tr>
          <td>
            <label>Search :</label>
          </td>
          <td>
            <input type="text"></input>
          </td>
        </tr> */}

        <tr>
          <td>
            <label>Add URL</label>
          </td>
          <td>
            <form>
              <input
                required
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></input>
            </form>
          </td>
        </tr>
        <br></br>

        <tr>
          <td>
            <label>Add Description</label>
          </td>
          <td>
            <form>
              <input
                required
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></input>
            </form>
          </td>
        </tr>
<br></br>
        <tr>
          <td></td>
          <td>
            <label> </label>
            <Button type="submit" name="add-url" variant="success" type="submit"  onClick={addMedia}>
              Add
            </Button>
          </td>
        </tr>
      </table>

      <div></div>
    </div>
  );
}

export default Mediaform;
