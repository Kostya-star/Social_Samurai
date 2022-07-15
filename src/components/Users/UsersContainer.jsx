import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, toggleFollowingProgress, getUsers } from './../../redux/users-reducer';
import * as axios from 'axios';
import Users from './Users'
import Preloader from '../common/preloader/Preloader';
import { WithAuthRedirect } from './../../hoc/WithAuthRedirect';

class UsersContainer extends React.Component {

  componentDidMount() {

    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);

  }
   
  render() {

    return <>
    {this.props.isFetching ? <Preloader/> : null}
     <Users pageSize={this.props.pageSize}
                  totalUsersCount={this.props.totalUsersCount}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
                  followingInProgress={this.props.followingInProgress}
                  />
                  </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users, 
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default WithAuthRedirect(connect(mapStateToProps, {follow,unfollow,setCurrentPage,
                      toggleFollowingProgress, getUsers
                      }) (UsersContainer));