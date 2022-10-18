import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {sendMessage} from '../../../../redux/chat-reducer'
import { AppDispatch, AppStateType } from '../../../../redux/redux-state';


const SendMessageForm: React.FC = () => {

  const[message, setMessage] = React.useState('')
  
  const[readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending')

  const status = useSelector((state: AppStateType) => state.chat.status)

  const dispatch: AppDispatch = useDispatch()
 
  const onSendMessage = () => {
    if (!message) return 

    dispatch(sendMessage(message))
    setMessage('')
  }

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === 'Enter' &&  message !== null) {
  //     onSendMessage()
  //   }
  // }

  return (
    <div>
      <div>
      {/* onKeyPress={handleKeyPress} */}
        <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}   ></textarea>
      </div>
      <div>

        
        <button disabled={status !== 'ready'} onClick={onSendMessage}> Send </button>
      </div>
    </div>
  )
}


export default SendMessageForm;