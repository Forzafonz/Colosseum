import React from 'react'
import './styles.scss'

export default function NewMessage(props) {
  const { onSumbit, onEnter } = props;

  // This is reference to easily retrieve value of textarea on any submit event
  const ref = React.useRef(null);

  // This handler is invoked when user presses send button.
  // it Invokes submitMessage from Message component passed as onSubmit prop
  const submitText = (e) => {
    if (ref.current.value) {
      onSumbit(e, ref.current.value)
      ref.current.value =""
    }
  }
  
  // This function called everytime something is pressed in tetxarea field
  // and it calls andleKeyPress function defined in Messages.jsx which was passed as onEnter prop
  // Used to send messages on Enter
  const enterPress = (e) => {
    onEnter(e, ref.current.value)
  }
  // Input form for a new message at the bottom of the chat
  return (
    <div className="message-box">
      <textarea type="text" className="message-input" placeholder="Type message..." ref = {ref} onKeyPress={enterPress}>
      </textarea>
      <button type="submit" className="message-submit" onClick = {submitText}>Send</button>
   </div>
  )
}
