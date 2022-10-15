import React from 'react'
import { MessageBlockType } from '../Messages';


const MessageBlock: React.FC<{message: MessageBlockType}> = ({ message }) => {
  return (
    <div>
      <div>
        <img src={message.photo} style={{width: '30px'}} alt="img" />
        <span>{message.userName}</span>
      </div>
      <div>
        {message.message}
      </div>
    </div>
  )
}

export default MessageBlock;
