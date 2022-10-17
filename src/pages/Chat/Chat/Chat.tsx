import React from 'react';
import Messages from './Messages/Messages';
import SendMessageForm from './SendMessageForm/SendMessageForm';


const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null)

  React.useEffect(() => {
    let ws: WebSocket;

    const closeHandler = () => {
      console.log('CLOSE WS');
      setTimeout( createWsChannel, 2000 )
    }

    function createWsChannel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    }

    createWsChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return (
    <div>
      <Messages wsChannel={wsChannel}/>
      <SendMessageForm wsChannel={wsChannel}/>
    </div>
  )
}

export default Chat;