import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Room from './Components/Room/Room';
import Header from './Components/Header';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NewPlaylist from './Components/Home/NewPlaylist/NewPlaylist';
import useApplicationData from './hooks/useApplicationData'

function App() {

  const {
    state,
    setPlayingMedia,
    setPlaylist, 
    addMediaToPlaylist,
    removeMediaFromPlaylist,
    updatenewPlaylist,
    setStale,
    setNextMedia,
    setOrderFromLikes,
    addMessage,
    elapsedTimeOther, 
    conn,
    playing
  } = useApplicationData();

  return (

    <Router>

      {/* <Link to = "/"></Link> */}
      

      <Switch>        

        <Route path = "/home">
          <Header 
          setPlaylist={setPlaylist}
          />
          <Home 
          state={state} 
          setPlaylist={setPlaylist}
          updatenewPlaylist = {updatenewPlaylist}
          setStale={setStale}
          setPlayingMedia={setPlayingMedia}
          />
        </Route>

        <Route path = "/room">
          <Header
          setPlaylist={setPlaylist} 
          />
          <Room state1={state} 
          setPlayingMedia={setPlayingMedia}
          addMediaToPlaylist = {addMediaToPlaylist}
          removeMediaFromPlaylist = {removeMediaFromPlaylist}
          setNextMedia = {setNextMedia}
          setOrderFromLikes = {setOrderFromLikes}
          addMessage = {addMessage}
          elapsedTimeOther = {elapsedTimeOther}
          conn = {conn}
          playing = {playing}
          />
        </Route>
        <Route path = "/createplaylist">
          <NewPlaylist
          updatenewPlaylist = {updatenewPlaylist}
          />
        </Route>

        <Route path = "/playlist/:url">
          {/* <Mediaform/> */}
        </Route>
       
        <Route path = "/">
         <Landing setStale={setStale} setPlaylist={setPlaylist} />
        </Route>
      </Switch>
    
    </Router>


     

  
  )
}

export default App; 