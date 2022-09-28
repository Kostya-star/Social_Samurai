import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";


type StateProfilePageType = {posts: Array<StateProfilePagePostsType>, newPostText: string}
type StateProfilePagePostsType = {id: number, message: string, likesCount: number}

type StateDialogsPageType = {dialogs: Array<StateDialogsPageDialogsType>, 
                              messages: Array<StateDialogsPageMessagesType>, 
                              newMessageBody: string}
type StateDialogsPageDialogsType = { id: number, name: string }
type StateDialogsPageMessagesType = { id: number, message: string }

// type StoreType_2 = typeof store;
type StoreType = {
  _state: {
    profilePage: {
      posts: Array<StateProfilePagePostsType>
      newPostText: string
    }
    dialogsPage: {
      dialogs: Array<StateDialogsPageDialogsType>
      messages: Array<StateDialogsPageMessagesType>
      newMessageBody: string
    }
    sidebar: {}
  }
}

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'hey yo', likesCount: 15 },
        { id: 2, message: 'sup nigga', likesCount: 20 },
      ] as Array<StateProfilePagePostsType>,
      newPostText: 'fixed data',
    } as StateProfilePageType,
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Costya" },
        { id: 2, name: "Vanya" },
        { id: 3, name: "Igor" },
        { id: 4, name: "Liuba" },
        { id: 5, name: "Julia" },
      ] as Array<StateDialogsPageDialogsType>,
      messages: [
        { id: 1, message: "sup yo" },
        { id: 2, message: "ur on a roll" },
        { id: 3, message: "hey yo" },
        { id: 4, message: "sup bro" },
        { id: 5, message: "speak eng!" },
      ] as Array<StateDialogsPageMessagesType>,
      // newDialogPost: 'badass',
      newMessageBody: 'badass',
    } as StateDialogsPageType,
    sidebar: {},
  },
  _callSubscriber() {
    console.log('state changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer: any) {
    this._callSubscriber = observer;
  },

  dispatch(action: any) {
    //@ts-ignore
    this._state.profilePage = profileReducer(this._state.profilePage, action);
        //@ts-ignore

    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    // this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    //@ts-ignore

    this._callSubscriber(this._state)
  },

} /* as StoreType_2 */

export default store;














