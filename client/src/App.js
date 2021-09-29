import React, { useReducer, useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Room from './Components/Room/Room';
import Header from './Components/Header';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import NewPlaylist from './Components/Home/NewPlaylist/NewPlaylist';
import Mediaform from './Components/Room/Mediaform';

function App() {

  return (

    <Router>

      {/* <Link to = "/"></Link> */}
      

      <Switch>        

        <Route path = "/home">
          <Header />
          <Home />
        </Route>

        <Route path = "/room">
          <Header />
          <Room />
        </Route>
        <Route path = "/create">
          <NewPlaylist/>
        </Route>

        <Route path = "/playlist/:id">
          <Mediaform/>
        </Route>
       
        <Route path = "/">
         <Landing />
        </Route>
      </Switch>
    
    </Router>


     

  
  )
}

export default App;
