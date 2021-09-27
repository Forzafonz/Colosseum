import React, { useReducer, useEffect, useState } from 'react';
import MainLanding from './LandingPage/MainLanding';
import Login from './LandingPage/Login';


function Landing() {

  const mode = 0;

  return (
    <>
    {!mode && <Login />}
    {mode && <div> LANDING PAGE! </div>}
    </>

  )
}

export default Landing;