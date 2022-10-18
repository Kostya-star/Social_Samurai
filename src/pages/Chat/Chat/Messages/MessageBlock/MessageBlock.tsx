import React from 'react'
import { MessageBlockAPIType } from '../../../../../api/api';


const MessageBlock: React.FC<{message: MessageBlockAPIType}> = React.memo (({ message }) => {
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
})

export default MessageBlock;
