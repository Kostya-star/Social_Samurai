import React from 'react'
import { MessageBlockType } from '../../../../api/api';
import MessageBlock from './MessageBlock/MessageBlock';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-state';



const Messages: React.FC = () => {

  const messages = useSelector((state: AppStateType) => state.chat.messages)

  return (
    <div style={{height: '400px',   overflowY: 'auto'}}>
      {messages.map((message: MessageBlockType, index: number) => <MessageBlock message={message} key={index}/>)}
    </div>
  )
}


export default Messages;