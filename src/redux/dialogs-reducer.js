const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
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
    newMessageBody: 'badass',
}

const dialogsReducer = (store = initialState, action) => {
  switch(action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      store.newMessageBody = action.body;
      return store;
    case SEND_MESSAGE:
      let body = store.newMessageBody;
      store.newMessageBody = '';
      store.messages.push({ id: 6, message: body});
      return store;
    default:
      return store;  

  }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (body) => (
  { type: UPDATE_NEW_MESSAGE_BODY, body: body }
)

export default dialogsReducer;