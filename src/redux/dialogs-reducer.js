let ADD_DIALOG = 'ADD-DIALOG';
let UPDATE_NEW_DIALOG_TEXT = 'UPDATE-NEW-DIALOG-TEXT';

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
    newDialogPost: 'badass',
}

const dialogsReducer = (store = initialState, action) => {

  switch (action.type) {
    case ADD_DIALOG:
      let newDialog = {
        id: 6,
        message: store.newDialogPost,
      }
      store.messages.push(newDialog)
      store.newDialogPost = '';
      return store;
    case UPDATE_NEW_DIALOG_TEXT:
      store.newDialogPost = action.newText;
      return store;
    default:
      return store;
  }
}

export const addDialogActionCreator = () => ({ type: ADD_DIALOG })
export const updateNewDialogTextActionCreator = (text) => (
  { type: UPDATE_NEW_DIALOG_TEXT, newText: text }
)

export default dialogsReducer;