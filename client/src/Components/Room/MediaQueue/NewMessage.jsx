import React from 'react'


 const NewMessage = React.forwardRef((props, ref) => {

  const {setEmpty} = props;

  const eventHandler = (event) => {
    event.preventDefault()
    setEmpty(true)
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