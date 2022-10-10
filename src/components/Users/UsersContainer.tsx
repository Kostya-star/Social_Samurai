import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, requestUsers, FilterType } from '../../redux/users-reducer';
import Users from './Users'
import Preloader from '../common/preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getPageSize, getTotalUsersCount, getIsFetching, getFollowingInProgress, getUsers, getUsersFilter } from '../../redux/users-selectors';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/redux-state';

type MapStatePropsType = {  
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalItemsCount: number
  users: Array<UsersType>
  followingInProgress: Array<number>
  filter: FilterType
}
type MapStateDispatchType = {  
  requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void,
  unfollow: (id: number) => void
  follow: (id: number) => void
}
type OwnPropsType = {  
  pageTitle: string
}
type UsersContainerPropsType = MapStatePropsType & MapStateDispatchType & OwnPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {

  componentDidMount() {
    let {currentPage, pageSize, filter} = this.props;
    this.props.requestUsers(currentPage, pageSize, filter);
  }
  
  onPageChanged = (pageNumber: number) => {
    let {pageSize, filter} = this.props;
    this.props.requestUsers(pageNumber, pageSize, filter);
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.requestUsers(1, pageSize, filter);
  }
   
  render() {
    
    return <div>
      <h2>{this.props.pageTitle}</h2>
    {this.props.isFetching ? <Preloader/> 
         : <Users pageSize={this.props.pageSize}
                  totalItemsCount={this.props.totalItemsCount}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  onFilterChanged={this.onFilterChanged}
                  users={this.props.users}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
                  followingInProgress={this.props.followingInProgress}
                  />}
                  </div>
                  
  }
}

    
    let mapStateToProps = (state: AppStateType): MapStatePropsType => {
      return {
        users: getUsers(state), 
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
      }
    }
    
    
    export default compose(
      connect<MapStatePropsType, MapStateDispatchType, OwnPropsType, AppStateType>
      (mapStateToProps, 
        {follow, unfollow, requestUsers})
      )(UsersContainer)            