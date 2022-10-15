import React from 'react'
import MessageBlock from './MessageBlock/MessageBlock';



export type MessageBlockType = {
  userId: number
  userName: string
  message: string
  photo: string
}


const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

  const [messages, setMessages] = React.useState<MessageBlockType[]>([])

  React.useEffect(() => {
    wsChannel?.addEventListener('message', (event: MessageEvent) => {
        // debugger
        const newMessages: MessageBlockType[] = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      })
  }, [wsChannel])
  // debugger

  return (
    <div style={{height: '400px',   overflowY: 'auto'}}>
      {messages.map((message: MessageBlockType, index: number) => <MessageBlock message={message} key={index}/>)}
    </div>
  )
}


export default Messages;