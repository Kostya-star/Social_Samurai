const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: "Costya" },
    { id: 2, name: "Vanya" },
    { id: 3, name: "Igor" },
    { id: 4, name: "Liuba" },
    { id: 5, name: "Julia" },
  ],
  messages: [
    { id: 1, message: "sup yo" },
    { id: 2, message: "ur on a roll" },
    { id: 3, message: "hey yo" },
    { id: 4, message: "sup bro" },
    { id: 5, message: "speak eng!" },
  ],
}

const dialogsReducer = (store = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer;