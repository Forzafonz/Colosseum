import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './mediaform.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import SearchResultsContainer from './SearchResultsContainer';


function Mediaform() {
  const params = useParams();
  const [url, setUrl] = useState(''); //url to be added to playlist
  const [category, setCategory] = useState('youtube'); //youtube or soundcloud
  const [desc, setDesc] = useState(''); //Description for media
  const [buttonLabel, setButtonLabel] = useState('Search')
  // State to keep search result to display them in SearchResultsItem
  const [searchResults, setSearchResults] = useState({})

  // UPDATE INITIAL STATE ONCE FIXED CURRENT INITIAL STATE FOR TEST ONLY
  const [playlistName, setPlaylistName] = useState("Lolo"); 
  // UPDATE INITIAL STATE ONCE FIXED CURRENT INITIAL STATE FOR TEST ONLY
  const [currentplaylist_id, setCurrentplaylistId] = useState("6");

  //Gets playlist data from url
  // useEffect(() => {
  //   const data = params.url;
  //   axios
  //     .put('http://localhost:8000/api/searchPlaylist', { data })
  //     .then((res) => {
  //       console.log('======>res', res.data[0].id);

  //       setCurrentplaylistId(res.data[0].id);
  //       setPlaylistName(res.data[0].name);
  //     });
  // }, []);

//To add media to playlist
  const addMedia = () => {

     if (!url.includes("http") && category === "youtube") {
        axios.get(`/api/youtube/${url}`). then((result) => {
          const newResults = {};
          result.data.forEach((result, index) =>{
            const {id, snippet} = result;
            const {thumbnails, title, description} = snippet;
            newResults[index] ={
              link:`https://www.youtube.com/watch?v=${id.videoId}`,
              thumbnail : thumbnails.default,
              title,
              description
            }
          })
          setSearchResults(newResults);
        })
        .catch((error) => console.error("This is error", error))
     } else if (!url.includes("http") && category === "soundcloud") {
        //  do something
     } else {
        
        submitMedia({url, desc})
     }

    // axios.put('http://localhost:8000/api/addmedia', { data }).then((res) => {
    //   alert('Playlist updated');
    //   setUrl('');
    //   setDesc('');
    // });
  };

  const submitMedia = ({url, desc, image}) => {

    const playlist_id = currentplaylist_id;
    const data = {
      url,
      category,
      playlist_id,
      desc,
      thumbnail : image
    };

    console.log("I am submitting with this data:", data)
      axios.put('http://localhost:8000/api/addmedia', { data }).then((res) => {
      alert('Playlist updated');
      setUrl('');
      setDesc('');
    });

  }

  const newSearch = (e) =>{
    if (e.target.value.includes("http")){
      setButtonLabel("Add")
    } else {
      setButtonLabel("Search")
    }
    setUrl(e.target.value)
  }

  return (
    <div className="new-p-container">
      <br/>      

      <h1 className ="h-pl">Playlist : {playlistName} </h1>

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
            <label>Search or paste URL</label>
          </td>
          <td>
            <form>
              <input
                required
                type="text"
                value={url}
                onChange={(e) => newSearch(e)}
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
              {buttonLabel}
            </Button>
          </td>
        </tr>
      </table>

      <section className = "search-results-container">
           <SearchResultsContainer
            searchResults = {searchResults}
            submitMedia = {submitMedia}
            /> 
      </section>
    </div>
  );
}

export default Mediaform;



// YOUTUBE RESPONSE:
// array of objects:[{}, {}, {}]
// 0: 
//  {etag: "xWucDJa1s76RtOIFkiX_Fv5yCl8"
// id:
//  {kind: "youtube#video"
// videoId: "kXYiU_JCYtU"
// [[Prototype]]: Object}
// kind: "youtube#searchResult"
// snippet:{
// channelId: "UCZU9T1ceaOgwfLRq7OKFU4Q"
// channelTitle: "Linkin Park"
// description: "Watch the official music video for Numb by Linkin Park from the album Meteora. Stream: https://apple.co/2OCBU1k Subscribe to the channel: ..."
// liveBroadcastContent: "none"
// publishTime: "2007-03-05T08:12:00Z"
// publishedAt: "2007-03-05T08:12:00Z"
// thumbnails: {default: {…}, medium: {…}, high: {…}}
// title: "Numb [Official Music Video] - Linkin Park"}
//1:
// {etag: "S2hC7LPUC8JTcWWIwqg_LZ-QGEg"
// id:
// {kind: "youtube#video"
// videoId: "xGvIdbB67Qs"
// [[Prototype]]: Object}
// kind: "youtube#searchResult"
// snippet:{
// channelId: "UC0fGycccXWcPvOWgjKPO8dQ"
// channelTitle: "Jorge Gonzalez"
// description: "01 One step closer 00:00 02 Lost in the echo 02:35 03 Somewhere I belong 06:01 04 Given up 09:35 05 Papercut 12:44 06 Waiting for the end 15:50 07 Burn it ..."
// liveBroadcastContent: "none"
// publishTime: "2020-02-01T15:42:59Z"
// publishedAt: "2020-02-01T15:42:59Z"
// thumbnails: {default: {…}, medium: {…}, high: {…}}}
