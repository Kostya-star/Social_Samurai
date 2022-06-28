import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import MyPosts from "./MyPosts";
import {connect} from 'react-redux'
import store from './../../../redux/state';

// const MyPostsContainer = () => {

//   // let state = props.store.getState();

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         } 
      
//         let onPostChange = (text) => {
//           let action = updateNewPostTextActionCreator(text)
//           store.dispatch(action);
//         }
//         return (
//           <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             posts={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let state = store.getState();


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      let action = updateNewPostTextActionCreator(text)
      dispatch(action);
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  }
}

const SuperMyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)

export default SuperMyPostsContainer;
