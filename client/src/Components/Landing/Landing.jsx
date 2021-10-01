import React, { useReducer, useEffect, useState } from 'react';
import MainLanding from './LandingPage/MainLanding';
import Login from './LandingPage/Login';


function Landing({setStale, setPlaylist}) {

  const mode = 1;

  return (
    <>
    <Login setStale={setStale} setPlaylist={setPlaylist}/>
    {/* {!mode && <Login />}
    {mode && <div> LANDING PAGE! </div>} */}
    </>

  )
}

export default Landing;