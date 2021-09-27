import React, { useReducer, useEffect, useState } from 'react';
import MainLanding from './LandingPage/MainLanding';


function Landing() {

  const mode = 0;

  return (
    <>
    {!mode && <MainLanding />}
    {mode && <div> LANDING PAGE! </div>}
    </>

  )
}

export default Landing;