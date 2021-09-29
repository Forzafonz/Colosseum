import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './mediaform.scss';
import axios from 'axios';

function Mediaform() {
  const params = useParams();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState('youtube');
  const [desc, setDesc] = useState('');

  const addMedia = () => {
    const playlist_id = params.id;
    const data ={
      url,
      category,
      playlist_id,
      desc
    }

    axios.put('http://localhost:8000/api/addmedia',{data})
    .then((res) => {   
      alert('Success');
      setUrl('');
      setDesc('');



    })

  }



  return (
    <div className="new-p-container">
      <h1>Playlist {params.id}</h1>

      <table name="new-table">
        <tr>
          <td>
            <label>Select category</label>
          </td>
          <td>
            <select value = {category} onChange = {(e) => setCategory(e.target.value)}>
              <option value="youtube">Youtube</option>
              <option value="soundcloud">Soundcloud</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Search :</label>
          </td>
          <td>
            <input type="text" ></input>
          </td>
        </tr>

        <tr>
          <td>
            <label>Add URL</label>
          </td>
          <td>
            <form>
              <input required type="text" value = {url}
              onChange={(e) => setUrl(e.target.value)}
              ></input>
            </form>
          </td>
        </tr>
        

        <tr>
          <td>
            <label>Add Description</label>
          </td>
          <td>
            <form>
              <input required type="text" value = {desc}
              onChange={(e) => setDesc(e.target.value)}
              ></input>
            </form>
          </td>
        </tr>
        <tr>

          <td></td>
          <td >
            <label> </label>
            <button type="submit" name="add-url" onClick = {addMedia}>
              Add
            </button>
          </td>
        </tr>
      </table>

      <div></div>
    </div>
  );
}

export default Mediaform;
