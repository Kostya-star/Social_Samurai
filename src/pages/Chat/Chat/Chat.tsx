import React from 'react';
import Messages from './Messages/Messages';
import SendMessageForm from './SendMessageForm/SendMessageForm';


const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null)

  let ws: WebSocket;

  React.useEffect(() => {

    function createWsChannel() {
      setWsChannel(new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
    }

    createWsChannel()
  }, [])

  React.useEffect(() => {
    wsChannel?.addEventListener('close', () => {
      console.log('CLOSE WS');
    })
  }, [wsChannel])

  return (
    <div>
      <Messages wsChannel={wsChannel}/>
      <SendMessageForm wsChannel={wsChannel}/>
    </div>
  )
}

export default Chat;