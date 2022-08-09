import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, toggleFollowingProgress, requestUsers } from './../../redux/users-reducer';
import Users from './Users'
import Preloader from '../common/preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getPageSize, getTotalUsersCount, getIsFetching, getFollowingInProgress, getUsers } from './../../redux/users-selectors';

class UsersContainer extends React.Component {

  componentDidMount() {
    let {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }
  
  onPageChanged = (pageNumber) => {
    let {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize);

  }
   
  render() {
    
    return <div>
    {this.props.isFetching ? <Preloader/> : <Users pageSize={this.props.pageSize}
                  totalUsersCount={this.props.totalUsersCount}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
                  followingInProgress={this.props.followingInProgress}
                  />}
                  </div>
                  
  }
}

    
    let mapStateToProps = (state) => {
      console.log('mstpUsers');
      return {
        users: getUsers(state), 
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
      }
    }
    
    
    export default compose(
      connect(mapStateToProps,{follow,unfollow,setCurrentPage,toggleFollowingProgress, requestUsers})
      )(UsersContainer)                      