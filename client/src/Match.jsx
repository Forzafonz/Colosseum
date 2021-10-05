import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Route, Redirect} from 'react-router-dom';
// This is a fake component which is used as a mid-point when we past a link to join specific playlist. it is used to 
// parse parameters in the string and trigger state update. This component does not render anything. It just runs functions and 
// redirect to /room route. Thus, all custom share playlist links look the same as /room.
export default function Match({setStale, joinRoomById, conn}) {
const {id} = useParams()
setStale(true)
joinRoomById(id, conn)

useEffect(() => {
  console.log("THIS IS CONN IN MATCH", conn)
  joinRoomById(id, conn)
}, [id])

  return (
    <Route>
      <Redirect to={{ pathname: '/room'}} />
    </Route>
  )
}
