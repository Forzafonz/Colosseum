import React from 'react'
import { Route, Redirect} from 'react-router-dom';
// This is a fake component which is used as a mid-point when we press HOME button in NAV. it is used to 
// set current playlist and media to null. This component does not render anything. It just runs functions and 
// reiderct to /home route.
export default function Clear({setPlaylist, clearMediaOnHome, }) {
  console.log("I AM HERE")
  clearMediaOnHome(null)
  setPlaylist(null)
  return (
    <Route>
      <Redirect to='/home' />
    </Route>
  )
}
