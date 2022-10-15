import React from 'react';
import Messages from './Messages/Messages';
import SendMessageForm from './SendMessageForm/SendMessageForm';


const Chat: React.FC = () => {

  return (
    <div>
      <Messages/>
      <SendMessageForm/>
    </div>
  )
}

export default Chat;