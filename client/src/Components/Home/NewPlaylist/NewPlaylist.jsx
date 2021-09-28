import React, { useReducer, useEffect, useState, useRef } from 'react';
import '../homestyle.scss';
import Addeditems from './Addeditems';
import axios from 'axios';

function NewPlaylist() {

  const [name, setName] = useState('');
  const [tnail, setTnail] = useState('');
  const [user, setUser] = useState('');
  const [udata, setUdata] = useState([]);

  const addtolist = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/api/user/${user}`)
    .then((res) => {
      console.log("---->-->user name", res.data[0].username);
      const udata1 = [...udata];
      const obj2 = {};
      obj2['id']=udata.length;
      obj2['u_id'] = res.data[0].id;
      obj2['name'] = user;
      udata1[udata.length] = obj2;
      setUdata(udata1);
      setUser('');
      
    })
    .catch((error) => alert('invalid user'));

    // console.log('----------->', udata1);
  };

  const deleteurl = function (id) {
    const udata1 = [...udata];
    const y = udata1.indexOf(udata[id]);
    udata1.splice(y, 1);
    setUdata(udata1);
  };

  const createPlaylist = function (e) {
    const user_id = 1;
    const data = {
      name,
      tnail,
      udata,
      user_id
    };
    axios.put('http://localhost:8000/api/create',{data})
      .then((res) => {
        // console.log("-----res",res);
        setName('');
        setTnail('');
        setUdata([]);
        setUser('');
        alert(`Playlist created successfully. Link to playlist is http://localhost:3000/playlist/${res.data[0].id}`);
        console.log("```````res", res.data[0].id);
      }
        )
        .catch(error=> console.log(error.message))

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
                value={user}
                onChange={(e) => setUser(e.target.value)}
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
        {udata.map((x) => (
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
