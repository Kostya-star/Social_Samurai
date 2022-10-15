import React from 'react'
import MessageBlock from './MessageBlock/MessageBlock';


export const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type MessageBlockType = {
  userId: number
  userName: string
  message: string
  photo: string
}


const Messages: React.FC = () => {

  const [messages, setMessages] = React.useState<MessageBlockType[]>([])
  console.log(messages);


  React.useEffect(() => {
      new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      .addEventListener('message', (event: MessageEvent) => {
        // debugger
        const newMessages: MessageBlockType[] = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      })
  }, [])
  // debugger

  return (
    <div style={{height: '400px',   overflowY: 'auto'}}>
      {messages.map((message: MessageBlockType, index: number) => <MessageBlock message={message} key={index}/>)}
    </div>
  )
}


export default Messages;