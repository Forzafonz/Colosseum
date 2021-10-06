import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Room from './Components/Room/Room';
import Header from './Components/Header';
import Landing from './Components/Landing/Landing';
import Login from './Components/Landing/LandingPage/Login';
import Home from './Components/Home/Home';
import NewPlaylist from './Components/Home/NewPlaylist/NewPlaylist';
import useApplicationData from './hooks/useApplicationData'
import { useHistory } from 'react-router-dom';
import Match from './Match';
import Clear from './Clear';
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
    joinRoomById,
    elapsedTimeOther,
    clearMediaOnHome,
    setShowPlaylist, 
    conn,
    playing
  } = useApplicationData();

  
  return (

    <Router>

      {/* <Link to = "/"></Link> */}
      

      <Switch>        
      {/* Fake component. Refer to the comment in the component itself. */}
      <Route path="/home/clear" >
          <Clear 
            setPlaylist={setPlaylist} 
            clearMediaOnHome = {clearMediaOnHome}
          />
        </Route>

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
          setShowPlaylist = {setShowPlaylist}
          />
        </Route>
    
       

            
        <Route exact path = "/room">
          <Header
          setPlaylist={setPlaylist}
          state = {state} 
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
          setPlaylist = {setPlaylist}
          />
        </Route>
      {/* Fake component. Refer to the comment in the component itself. */}
        <Route path="/room/:id">
            <Match 
            setPlaylist = {setPlaylist}
            setStale = {setStale}
            joinRoomById = {joinRoomById}
            conn = {conn}
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

        <Route path = "/login">
          <Login setStale={setStale} setPlaylist={setPlaylist} />
        </Route>
       
        <Route path = "/">
         <Landing setStale={setStale} setPlaylist={setPlaylist} />
        </Route>
      </Switch>
    
    </Router>


     

  
  )
}

export default App; 