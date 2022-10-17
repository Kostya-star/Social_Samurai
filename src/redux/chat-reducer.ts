import {authAPI, chatAPI, MessageBlockType, ResultCodeEnum, ResultCodeForCaptchaEnum, securityAPI} from '../api/api'
import {FormAction, stopSubmit} from 'redux-form';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-state';
import Messages from '../pages/Chat/Chat/Messages/Messages';


let initialState = {
  messages: [] as MessageBlockType[]
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const chatReducer = (store = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case 'SN/chat/MESSAGES_RECEIVED':
      return {
        ...store,
        messages: [...store.messages, ...action.payload]
      }

    default:
      return store;
  }
}

// type ActionsType = ReturnType<typeof actions.setAuthUserData> | ReturnType<typeof actions.getCaptchaUrlSuccess>

const actions = {
  messagesReceived: (messages: MessageBlockType[]) => ({ 
  type: 'SN/chat/MESSAGES_RECEIVED', payload: messages
  } as const),
}

let _newMessageHandler: ((messages: MessageBlockType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}


export default chatReducer;
