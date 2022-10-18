import React, { useRef } from 'react'
import { MessageBlockAPIType } from '../../../../api/api';
import MessageBlock from './MessageBlock/MessageBlock';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-state';



const Messages: React.FC = () => {

  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const lastMessageAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = React.useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const elem = e.currentTarget;
    if (Math.abs( (elem.scrollHeight - elem.scrollTop) - elem.clientHeight ) < 300) {
      !isAutoScroll && setIsAutoScroll(true)  
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  React.useEffect(() => {
    if (isAutoScroll) {
      lastMessageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  return (
    <div style={{height: '400px',   overflowY: 'auto'}} onScroll={scrollHandler}>
      { messages.map((message: MessageBlockAPIType, index: number) => <MessageBlock message={message} key={message.userId}/>) }
      <div ref={lastMessageAnchorRef}></div>
    </div>
  )
}


export default Messages;