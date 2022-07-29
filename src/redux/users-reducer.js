import { usersAPI } from '../api/api';


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
  totalUsersCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [], 
};

const usersReducer = (store = initialState, action) => {

  switch (action.type) {

    case FOLLOW:
      return {
        ...store,
        users: store.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          } 
          return u;
        })
      }

    case UNFOLLOW:
      return {
        ...store,
        users: store.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          } 
          return u;
        })
      }

      case SET_USERS: {
        return {...store, users: action.users}
      }

      case SET_СURRENT_PAGE: {
        return {...store, page: action.page}
      }

      case SET_TOTAL_USERS_COUNT: {
        return {...store, totalUsersCount: action.count}
      }

      case TOGGLE_IS_FETCHING: {
        return {...store, isFetching: action.isFetching}
      }

      case TOGGLE_IS_FOLLOWING_PROGRESS: {
        return {...store, followingInProgress: action.isFetching 
          ? [...store.followingInProgress, action.userId] 
          : store.followingInProgress.filter(id => id != action.userId)}
      }

    default:
      return store;
  }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_СURRENT_PAGE, page })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => {

 return (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

    usersAPI.getUsers(page, pageSize).then(data => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
      });
  }
}
 
export const unfollow = (userId) => {

 return (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  usersAPI.unfollow(userId)
  .then((response) => {             
    if( response.data.resultCode === 0 ) {
      dispatch(unfollowSuccess(userId)); 
    }
    dispatch(toggleFollowingProgress(false, userId));
  });
  }
}

export const follow = (userId) => {

 return (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  usersAPI.follow(userId)
  .then((response) => {
    if( response.data.resultCode === 0 ) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  });
  }
}


export default usersReducer;