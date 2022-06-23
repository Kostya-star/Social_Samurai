let ADD_POST = 'ADD-POST';
let UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
  posts: [
    { id: 1, message: 'hey yo', likesCount: 15 },
    { id: 2, message: 'sup nigga', likesCount: 20 },
  ],
  newPostText: 'fixed data',
};

const profileReducer = (store = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: store.newPostText,
        likesCount: 0,
      }
      store.posts.push(newPost)
      store.newPostText = '';
      return store;
    case UPDATE_NEW_POST_TEXT:
      store.newPostText = action.newText;
      return store;
    default:
      return store;
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => (
  { type: UPDATE_NEW_POST_TEXT, newText: text }
)

export default profileReducer;