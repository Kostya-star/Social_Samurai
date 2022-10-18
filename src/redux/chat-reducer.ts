import {authAPI, chatAPI, MessageBlockAPIType, ResultCodeEnum, ResultCodeForCaptchaEnum, securityAPI, StatusType} from '../api/api'
import {FormAction, stopSubmit} from 'redux-form';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-state';
import Messages from '../pages/Chat/Chat/Messages/Messages';
import { message } from 'antd';
import { v1 } from 'uuid';



type MessageBlockType = MessageBlockAPIType & {id: string}

let initialState = {
  messages: [] as MessageBlockType[],
  status: 'pending' as StatusType,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>


const chatReducer = (store = initialState, action: ActionsType): InitialStateType => {  

  switch (action.type) {

    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...store,
        messages: [...store.messages, ...action.payload.messages.map(message => ({ ...message, id: v1() }) )]
          .filter((message, ind, array) => ind >= array.length- 100)
      }
    case 'SN/chat/STATUS_CHANGED':
      return {
        ...store,
        status: action.payload.status
      }

    default:
      return store;
  }
}

// type ActionsType = ReturnType<typeof actions.setAuthUserData> | ReturnType<typeof actions.getCaptchaUrlSuccess>

const actions = {
  messagesReceived: (messages: MessageBlockAPIType[]) => ({ 
    type: 'SN/chat/MESSAGES_RECEIVED', payload: {messages}
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'SN/chat/STATUS_CHANGED', payload: {status}
  } as const)
}

let _newMessageHandler: ((messages: MessageBlockAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}


export default chatReducer;
