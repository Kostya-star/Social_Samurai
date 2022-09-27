const SEND_MESSAGE = 'SEND_MESSAGE';

type InitialStateDialogs = { id: number, name: string }
type InitialStateMessages = { id: number, message: string }

let initialState = {
  dialogs: [
    { id: 1, name: "Costya" },
    { id: 2, name: "Vanya" },
    { id: 3, name: "Igor" },
    { id: 4, name: "Liuba" },
    { id: 5, name: "Julia" },
  ] as Array<InitialStateDialogs>,
  messages: [
    { id: 1, message: "sup yo" },
    { id: 2, message: "ur on a roll" },
    { id: 3, message: "hey yo" },
    { id: 4, message: "sup bro" },
    { id: 5, message: "speak eng!" },
  ] as Array<InitialStateMessages>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (store = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...store,
        messages: [...store.messages, { id: 6, message: body }],
      }
    }
    default:
      return store;

  }
}

type SendMessageCreatorType = {type: typeof SEND_MESSAGE, newMessageBody: string}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;