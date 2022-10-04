import {profileActions} from '../../../redux/profile-reducer'
import MyPosts from "./MyPosts";
import {connect} from 'react-redux'


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(profileActions.addPostActionCreator(newPostText));
    },
  }
}

const SuperMyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)

export default SuperMyPostsContainer;
