import {rerenderEntireTree} from '../render'

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
  },
}

window.state = state


export let addPost = () => {
    let newPost = {
      id: 3, 
      message: state.profilePage.newPostText, 
      likesCount: 0,
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
  }

export let updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
}  

export default state;