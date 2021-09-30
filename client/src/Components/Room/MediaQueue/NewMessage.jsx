import React, { useContext} from 'react'
import { UserContext } from '../../../hooks/userContext';

 const NewMessage = React.forwardRef((props, ref) => {

  const {dispatch} = useContext(UserContext)

  const eventHandler = (event) => {
    event.preventDefault()
    dispatch({ type: "ADDNEW", values: { msg: ""} })
  }

  return (
    <span className = "main-block" ref = {ref}>
      <img
      src="images/add.png"
      alt="Add"
      onClick = {(e) => eventHandler(e)}
    />
    </span>
  )
})

export default NewMessage;