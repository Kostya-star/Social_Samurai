let rerenderEntireTree = () => {
  // console.log('state changed');
}

let state = {
    profilePage: {
    posts: [
      {id: 1, message: 'hey yo', likesCount: 15},
      {id: 2, message: 'sup nigga', likesCount: 20},
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
}
window.state = state;


export const addPost = () => {
    let newPost = {
      id: 3, 
      message: state.profilePage.newPostText, 
      likesCount: 0,
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
  }

  export const addDialog = () => {
    let newDialog = {
      id: 6,
      message: state.dialogsPage.newDialogPost,
    }
    state.dialogsPage.messages.push(newDialog)
    state.dialogsPage.newDialogPost = '';
    rerenderEntireTree(state)
  }



export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
}  

export const updateNewDialogText = (newText) => {
  state.dialogsPage.newDialogPost = newText;
  rerenderEntireTree(state);
}

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
}

export default state;