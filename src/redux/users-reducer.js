import { usersAPI } from '../api/api';
import { updateObjectInArray } from './../utils/object-helpers';


let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let SET_СURRENT_PAGE = 'SET_СURRENT_PAGE';
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
  users: [ ],
  pageSize: 5,
  totalItemsCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [], 
  fake: 10,
};

const usersReducer = (store = initialState, action) => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...store,
        users: updateObjectInArray(store.users, action.userId, 'id', {followed: true})
      }

    case UNFOLLOW:
      return {
        ...store,
        users: updateObjectInArray(store.users, action.userId, 'id', {followed: false})
      }

      case SET_USERS: {
        return {...store, users: action.users}
      }

      case SET_СURRENT_PAGE: {
        return {...store, page: action.page}
      }

      case SET_TOTAL_USERS_COUNT: {
        return {...store, totalItemsCount: action.count}
      }

      case TOGGLE_IS_FETCHING: {
        return {...store, isFetching: action.isFetching}
      }

      case TOGGLE_IS_FOLLOWING_PROGRESS: {
        return {...store, followingInProgress: action.isFetching 
          ? [...store.followingInProgress, action.userId] 
          : store.followingInProgress.filter(id => id !== action.userId)}
      }

    default:
      return store;
  }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_СURRENT_PAGE, page })
export const setTotalItemsCount = (totalItemsCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount})
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => {

 return async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalItemsCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId); 
    if( response.data.resultCode === 0 ) {
      dispatch(actionCreator(userId)); 
    }
    dispatch(toggleFollowingProgress(false, userId));
}
 
export const unfollow = (userId) => {

 return async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

export const follow = (userId) => {

 return async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}


export default usersReducer;