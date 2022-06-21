let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'hey yo', likesCount: 15 },
        { id: 2, message: 'sup nigga', likesCount: 20 },
      ],
      newPostText: 'fixed data',
    },
    dialogsPage: {
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
    },
  },
  _callSubscriber() {
    console.log('state changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if( action.type === 'ADD-POST' ) {
      let newPost = {
        id: 3,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      }
      this._state.profilePage.posts.push(newPost)
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state)
    } else if ( action.type === 'ADD-DIALOG') {
      let newDialog = {
        id: 6,
        message: this._state.dialogsPage.newDialogPost,
      }
      this._state.dialogsPage.messages.push(newDialog)
      this._state.dialogsPage.newDialogPost = '';
      this._callSubscriber(this._state)
    } else if ( action.type === 'UPDATE-NEW-POST-TEXT' ) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if ( action.type === 'UPDATE-NEW-DIALOG-TEXT' ) {
      this._state.dialogsPage.newDialogPost = action.newText;
      this._callSubscriber(this._state);
    } 
  },
  
}

export default store;
window.store = store;














