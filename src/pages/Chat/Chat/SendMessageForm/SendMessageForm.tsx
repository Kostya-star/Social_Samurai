import React from 'react'
// import { ws } from '../Chat'


const SendMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

  const[message, setMessage] = React.useState('')
  const[readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending')

  React.useEffect(() => {
    wsChannel?.addEventListener('open', () => {
      setReadyStatus('ready')
    })
  }, [])

  const sendMessage = () => {
    if (!message) return 
    wsChannel?.send(message)
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        
        // кнопка в данный момент disabled либо потому что wsChannel === null или readyStatus !== 'ready'
        // в след раз как сядешь за комп, то попробовать пофиксить. Если что попробовать wsChannel переменную 
        // поменять на new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') - как один 
        // из вариантов как починить проблему

        <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}> Send </button>
      </div>
    </div>
  )
}


export default SendMessageForm;