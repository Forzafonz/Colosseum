import React from 'react';
import MainLanding from './LandingPage/MainLanding';
import Login from './LandingPage/Login';


function Landing({setStale, setPlaylist}) {

  const mode = 1;

  return (
    <>
    {/* <MainLanding></MainLanding> */}
    {/* <Login setStale={setStale} setPlaylist={setPlaylist}/> */}
    {/* {!mode && <Login />}
    {mode && <div> LANDING PAGE! </div>} */}
    </>

  )
}

export default Landing;