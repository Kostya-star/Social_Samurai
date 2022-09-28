import { usersAPI } from '../api/api';
import { InitialStateProfilePhotosType, UsersType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';


let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let SET_СURRENT_PAGE = 'SET_СURRENT_PAGE';
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
  users: [] as Array<UsersType> ,
  pageSize: 5,
  currentPage: 1,
  totalItemsCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users ids
};

type InitianStateType = typeof initialState;

const usersReducer = (store = initialState, action: any): InitianStateType => {

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

type FollowSuccessType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId })
 
type UnfollowSuccessType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({ type: UNFOLLOW, userId })

type SetUsersType = {type: typeof SET_USERS, users: Array<UsersType>}
export const setUsers = (users: []): SetUsersType => ({ type: SET_USERS, users})

type SetCurrentPage = { type: typeof SET_СURRENT_PAGE, page: number }
export const setCurrentPage = (page: number): SetCurrentPage => ({ type: SET_СURRENT_PAGE, page })

type SetTotalItemsCountType = { type: typeof SET_TOTAL_USERS_COUNT, count: number}
export const setTotalItemsCount = (totalItemsCount: number): SetTotalItemsCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount})

type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page: number, pageSize: number) => {

 return async (dispatch: any) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalItemsCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId); 
    if( response.data.resultCode === 0 ) {
      dispatch(actionCreator(userId)); 
    }
    dispatch(toggleFollowingProgress(false, userId));
}
 
export const unfollow = (userId: number) => {

 return async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

export const follow = (userId: number) => {

 return async (dispatch: any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}


export default usersReducer;