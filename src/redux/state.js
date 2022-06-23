import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";


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
    sidebar: {},
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
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    // this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state)
  },

}

export default store;
window.store = store;














