import React, { useState } from 'react';
import '../homestyle.scss';
import Addeditems from './Addeditems';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function NewPlaylist({updatenewPlaylist, setPlaylist}) {
  const [name, setName] = useState(''); //Playlist name
  const [tnail, setTnail] = useState(''); //Playlist Thumbnail
  const [user, setUser] = useState(''); //User to be added to list
  const [udata, setUdata] = useState([]); //Array of objects to contain users data
  const history = useHistory();

  const user_id = localStorage.getItem('user_id');

  //function to add user to div container to show through <Addeditems>
  const addtolist = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/user/${user}`) //Checks for valid user
      .then((res) => {
        console.log('---->-->user name', res.data[0].username);
        const udata1 = [...udata];
        const obj2 = {};
        // obj2['id']=udata.length;

        if (udata.length === 0) {
          obj2['id'] = 0;
        } else {
          obj2['id'] = udata[udata.length - 1]['id'] + 1;
        }
        console.log(obj2['id']);
        obj2['u_id'] = res.data[0].id;
        obj2['name'] = user;

        if (udata.length === 0) {
          udata1[0] = obj2;
        } else {
          udata1[udata.length] = obj2;
        }

        console.log(udata1);
        setUdata(udata1);
        setUser('');
      })
      .catch((error) => alert('invalid user'));
  };
  //function to delete user from container
  const deleteurl = function (id) {
    const udata1 = [...udata];
    let req_index = 0;
    for (let i in udata1) {
      if (udata1[i]['id'] == id) {
        req_index = i;
      }
    }

    udata1.splice(req_index, 1);
    console.log(udata1);
    setUdata(udata1);
  };

  //Function to create playlist
  const createPlaylist = function (e) {
    const data = {
      name,
      tnail,
      udata,
      user_id,
    };
    // setPlaylist()
    updatenewPlaylist(data);

   
      setName('');
      setTnail('');
      setUdata([]);
      setUser('');
      history.push("/room");
      
    
    // axios
    //   .put('http://localhost:8000/api/createplaylist', { data })
    //   .then((res) => {
    //     setName('');
    //     setTnail('');
    //     setUdata([]);
    //     setUser('');
    //     alert(
    //       `Playlist created successfully. Link to playlist is http://localhost:3000/playlist/${res.data[0].url}`
    //     );
    //     console.log('```````res', res.data[0]);
    //   })
    //   .catch((error) => console.log(error.message));
  };

  return (
    <div className="newplaylist">
      <h1 className="heading">Create a New Playlist</h1>
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
              <Button type="submit" name="add-url" variant="success">
                Add
              </Button>
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

      <Button
        type="submit"
        onClick={createPlaylist}
        size="lg"
        variant="success"
      >
        Create Playlist!
      </Button>
    </div>
  );
}

export default NewPlaylist;
