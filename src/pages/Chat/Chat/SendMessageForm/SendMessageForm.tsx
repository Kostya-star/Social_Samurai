import React from 'react'
// import { ws } from '../Chat'


const SendMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

  const[message, setMessage] = React.useState('')
  const[readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending')
  // console.log('readyStatus', readyStatus);
  // console.log('wsChannel', wsChannel);
  

  React.useEffect( () => {
    const onOpenHandler = () => {
      setReadyStatus('ready')
    }

    // if(wsChannel !== null) {
    //   wsChannel?.removeEventListener('open', onOpenHandler)
    // }

    wsChannel?.addEventListener('open', onOpenHandler)

    return () => {
      wsChannel?.removeEventListener('open', onOpenHandler)
    }
  }, [wsChannel])

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

        <button disabled={wsChannel === null || readyStatus === 'pending'} onClick={sendMessage}> Send </button>
      </div>
    </div>
  )
}


export default SendMessageForm;