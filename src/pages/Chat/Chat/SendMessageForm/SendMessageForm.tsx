import React from 'react'
import { useDispatch } from 'react-redux';
import {sendMessage} from '../../../../redux/chat-reducer'


const SendMessageForm: React.FC = () => {

  const[message, setMessage] = React.useState('')
  const[readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending')
  
  const dispatch = useDispatch()
 
  const onSendMessage = () => {
    if (!message) return 
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>

        <button disabled={false} onClick={onSendMessage}> Send </button>
      </div>
    </div>
  )
}


export default SendMessageForm;