import {profileActions} from '../../../redux/profile-reducer'
import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";
import {connect} from 'react-redux'
import { AppStateType } from '../../../redux/redux-state';


let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const SuperMyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: profileActions.addPostActionCreator
}) (MyPosts)

export default SuperMyPostsContainer;
