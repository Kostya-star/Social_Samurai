let ADD_DIALOG = 'ADD-DIALOG';
let UPDATE_NEW_DIALOG_TEXT = 'UPDATE-NEW-DIALOG-TEXT';

const dialogsReducer = (state, action) => {

  switch(action.type) {
    case ADD_DIALOG:
      let newDialog = {
        id: 6,
        message: state.newDialogPost,
      }
      state.messages.push(newDialog)
      state.newDialogPost = '';
      return state;
    case UPDATE_NEW_DIALOG_TEXT:
      state.newDialogPost = action.newText;
      return state;
    default:
      return state;  
  }
}

export const addDialogActionCreator = () => ({ type: ADD_DIALOG })
export const updateNewDialogTextActionCreator = (text) => (
  {type: UPDATE_NEW_DIALOG_TEXT, newText: text}
  )

export default dialogsReducer;