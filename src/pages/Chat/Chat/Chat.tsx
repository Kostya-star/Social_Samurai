import React from 'react';
import Messages from './Messages/Messages';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening } from '../../../redux/chat-reducer';
import { stopMessagesListening } from './../../../redux/chat-reducer';
import { AppDispatch, AppStateType } from '../../../redux/redux-state';


const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  React.useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === 'error' && <div>Some error occured. plz reload the page</div> }
            <Messages />
            <SendMessageForm />
    </div>
  )
}

export default Chat;