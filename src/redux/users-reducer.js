let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let SET_СURRENT_PAGE = 'SET_СURRENT_PAGE';
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  users: [ ],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
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
        return {...store, currentPage: action.currentPage}
      }

      case SET_TOTAL_USERS_COUNT: {
        return {...store, totalUsersCount: action.count}
      }

      case TOGGLE_IS_FETCHING: {
        return {...store, isFetching: action.isFetching}
      }

    default:
      return store;
  }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({ type: SET_СURRENT_PAGE, currentPage: currentPage })
export const setUsersTotalCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export default usersReducer;