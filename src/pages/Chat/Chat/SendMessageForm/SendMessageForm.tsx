import React from 'react'
import { ws } from './../Messages/Messages';


const SendMessageForm: React.FC = () => {

  const[message, setMessage] = React.useState('')

  const sendMessage = () => {
    if (!message) return 
    ws.send(message)
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button onClick={sendMessage}> Send </button>
      </div>
    </div>
  )
}


export default SendMessageForm;