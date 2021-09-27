import React, { useReducer, useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import NewRoom from './Components/NewRoom/NewRoom';
import Header from './Components/Header';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';

function App() {

  return (

    <Router>

      {/* <Link to = "/"></Link> */}
      

      <Switch>        

        <Route path = "/home">
          <Header />
          <Home />
        </Route>

        <Route path = "/newroom">
          <Header />
          <NewRoom />
        </Route>
      
        <Route path = "/">
         <Landing />
        </Route>

      </Switch>
    
    </Router>


     

  
  )
}

export default App;
