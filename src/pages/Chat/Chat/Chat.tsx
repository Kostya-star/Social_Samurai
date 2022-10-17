import React from 'react';
import Messages from './Messages/Messages';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import { useDispatch } from 'react-redux';
import { startMessagesListening } from '../../../redux/chat-reducer';
import { stopMessagesListening } from './../../../redux/chat-reducer';


const Chat: React.FC = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      <Messages />
      <SendMessageForm />
    </div>
  )
}

export default Chat;