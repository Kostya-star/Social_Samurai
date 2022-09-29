import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api';
import { InitialStateProfilePhotosType, UsersType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType } from './redux-state';


let FOLLOW = 'FOLLOW' as const;
let UNFOLLOW = 'UNFOLLOW' as const;
let SET_USERS = 'SET_USERS' as const;
let SET_СURRENT_PAGE = 'SET_СURRENT_PAGE' as const;
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT' as const;
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING' as const;
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS' as const;



let initialState = {
  users: [] as Array<UsersType> ,
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: true,
  page: 1,
  followingInProgress: [] as Array<number>, //array of users ids
};

type InitialStateType = typeof initialState;

const usersReducer = (store = initialState, action: ActionsTypes ): InitialStateType => {

  switch (action.type) {
    case FOLLOW: {
      return {
        ...store,
        users: updateObjectInArray(store.users, action.userId, 'id', {followed: true})
      }
    }

    case UNFOLLOW: {
      return {
        ...store,
        users: updateObjectInArray(store.users, action.userId, 'id', {followed: false})
      }
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

// type ActionsTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType |
//                    SetTotalItemsCountType | ToggleIsFetchingType | ToggleFollowingProgressType

// function inferLiteralFromString<T extends string>(arg: T): T {
//   return arg;
// }

type ActionsTypes = ReturnType<typeof followSuccess> | 
                    ReturnType<typeof unfollowSuccess> | 
                    ReturnType<typeof setUsers> | 
                    ReturnType<typeof setCurrentPage> | 
                    ReturnType<typeof setTotalItemsCount> | 
                    ReturnType<typeof toggleIsFetching> | 
                    ReturnType<typeof toggleFollowingProgress> 


// type FollowSuccessType = { 
//   type: typeof FOLLOW 
//   userId: number 
// }
export const followSuccess = (userId: number) => ({ type: FOLLOW, userId })
 
// type UnfollowSuccessType = { 
//   type: typeof UNFOLLOW
//   userId: number 
// }
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW, userId })

// type SetUsersType = {
//   type: typeof SET_USERS 
//   users: Array<UsersType>
// }
export const setUsers = (users: Array<UsersType>) => ({ type: SET_USERS, users})

// type SetCurrentPageType = { 
//   type: typeof SET_СURRENT_PAGE 
//   page: number 
// }
export const setCurrentPage = (page: number) => ({ type: SET_СURRENT_PAGE, page })

// type SetTotalItemsCountType = {
//   type: typeof SET_TOTAL_USERS_COUNT 
//   count: number
// }
export const setTotalItemsCount = (totalItemsCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount})

// type ToggleIsFetchingType = { 
//   type: typeof TOGGLE_IS_FETCHING
//   isFetching: boolean 
// }
export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching })

// type ToggleFollowingProgressType = { 
//   type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
//   isFetching: boolean
//   userId: number 
// }
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {

 return async (dispatch, getState) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalItemsCount(data.totalCount));
  }
}

type FollowUnfollowFlowActionCreatorType = ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>

const followUnfollowFlow = async (dispatch: DispatchType, 
                                  userId: number, 
                                  apiMethod: any, 
                                  actionCreator: (userId: number) => FollowUnfollowFlowActionCreatorType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId); 
    if( response.data.resultCode === 0 ) {
      dispatch(actionCreator(userId)); 
    }
    dispatch(toggleFollowingProgress(false, userId));
}
 
export const unfollow = (userId: number): ThunkType => {

 return async (dispatch, getState) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

export const follow = (userId: number): ThunkType => {

 return async (dispatch, getState) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}


export default usersReducer;





