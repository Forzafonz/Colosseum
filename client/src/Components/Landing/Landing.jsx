import React from 'react';
// import MainLanding from './LandingPage/MainLanding';
import Login from './LandingPage/Login';


function Landing() {

  const mode = 1;

  return (
    <>
    <Login />
    {/* {!mode && <Login />}
    {mode && <div> LANDING PAGE! </div>} */}
    </>

  )
}

export default Landing;