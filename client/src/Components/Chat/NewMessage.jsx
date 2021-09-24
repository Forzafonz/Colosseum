import React from 'react'
import './styles.scss'

export default function NewMessage(props) {
  const { onSumbit, onEnter } = props;
  const ref = React.useRef(null);

  const submitText = (e) => {
    if (ref.current.value) {
      onSumbit(e, ref.current.value)
      ref.current.value =""
    }
  }

  const enterPress = (e) => {
    onEnter(e, ref.current.value)
  }
  //Test comment
  return (
    <div className="message-box">
      <textarea type="text" className="message-input" placeholder="Type message..." ref = {ref} onKeyPress={enterPress}>
      </textarea>
      <button type="submit" className="message-submit" onClick = {submitText}>Send</button>
   </div>
  )
}
