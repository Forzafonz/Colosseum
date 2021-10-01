import React, { useReducer, useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Room from './Components/Room/Room';
import Header from './Components/Header';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NewPlaylist from './Components/Home/NewPlaylist/NewPlaylist';
import Mediaform from './Components/Room/Mediaform';
import useApplicationData from './hooks/useApplicationData'

function App() {

  const {
    state,
    setPlayingMedia,
    setPlaylist,
    setStale
  } = useApplicationData();

  return (

    <Router>

      {/* <Link to = "/"></Link> */}
      

      <Switch>        

        <Route path = "/home">
          <Header />
          <Home state={state} setPlaylist={setPlaylist} setStale={setStale}/>
        </Route>

        <Route path = "/room">
          <Header />
          <Room state1={state} setPlayingMedia={setPlayingMedia}/>
        </Route>
        <Route path = "/createplaylist">
          <NewPlaylist/>
        </Route>

        <Route path = "/playlist/:url">
          <Mediaform/>
        </Route>
       
        <Route path = "/">
         <Landing setStale={setStale} setPlaylist={setPlaylist} />
        </Route>
      </Switch>
    
    </Router>


     

  
  )
}

export default App;
