import React, { useReducer, useEffect, useState, useRef } from 'react';
import '../homestyle.scss';
import Addeditems from './Addeditems';
import axios from 'axios';

function NewPlaylist() {
  const [name, setName] = useState('');
  const [tnail, setTnail] = useState('');
  const [url, setUrl] = useState('');
  const [obj, setObj] = useState([]);

  const addtolist = (e) => {
    e.preventDefault();

    const obj1 = [...obj];
    const obj2 = {};
    obj2['id'] = obj.length;
    obj2['name'] = url;
    obj1[obj.length] = obj2;
    setObj(obj1);
    setUrl('');
    console.log('----------->', obj1);
  };

  const deleteurl = function (id) {
    const obj1 = [...obj];
    const y = obj1.indexOf(obj[id]);
    console.log('-->y', y);
    obj1.splice(y, 1);
    setObj(obj1);
  };

  const createPlaylist = function(e) {

    const data = {
      name,
      tnail,
      obj
    }
    // return axios.put('/api/create',data)
    //   .then(
    //     );

        setName('');
        setTnail('');
        setObj([]);
        setUrl('');
        alert('Playlist created successfully');

  };

  return (
    <div className="newplaylist">
      <h1>Create a New Playlist</h1>
      <table name="new-table">
        <tr>
          <td>
            <label>Playlist Name:</label>
          </td>
          <td>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <label>Playlist Thumbnail:</label>
          </td>
          <td>
            <input
              type="text"
              value={tnail}
              onChange={(e) => setTnail(e.target.value)}
            ></input>
          </td>
        </tr>

        <tr>
          <td>
            <label>Add users to Playlist:</label>
          </td>
          <td>
            <form onSubmit={addtolist}>
              <input
                required
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></input>
              <label> </label>
              <button type="submit" name="add-url">
                Add
              </button>
            </form>
          </td>
        </tr>
      </table>
      <br></br>
      <div className="list-container">
        {obj.map((x) => (
          <Addeditems id={x.id} name={x.name} deleteurl={deleteurl} />
        ))}
      </div>
      <br></br>

      <button type="submit" onClick={createPlaylist}>
        Create Playlist!
      </button>
    </div>
  );
}

export default NewPlaylist;
