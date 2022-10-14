import { Dispatch } from 'redux';
import { ResponseType, usersAPI } from '../api/api';
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType, BaseThunkType } from './redux-state';


let FOLLOW = 'FOLLOW' as const;
let UNFOLLOW = 'UNFOLLOW' as const;
let SET_USERS = 'SET_USERS' as const;
let SET_СURRENT_PAGE = 'SET_СURRENT_PAGE' as const;
let SET_FILTER = 'SET_FILTER' as const;
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
  filter: {
    term: '',
    friend: null as boolean | null,
  }
};

type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

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

      case SET_FILTER: {
        return {...store, filter: action.payload}
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

type ActionsTypes = ReturnType<typeof actions.followSuccess> | 
                    ReturnType<typeof actions.unfollowSuccess> | 
                    ReturnType<typeof actions.setUsers> | 
                    ReturnType<typeof actions.setCurrentPage> | 
                    ReturnType<typeof actions.setTotalItemsCount> | 
                    ReturnType<typeof actions.toggleIsFetching> | 
                    ReturnType<typeof actions.toggleFollowingProgress> |
                    ReturnType<typeof actions.setFilter> 


export const actions = {
  followSuccess: (userId: number) => ({ type: FOLLOW, userId }),
  unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }),
  setUsers: (users: Array<UsersType>) => ({ type: SET_USERS, users}),
  setTotalItemsCount: (totalItemsCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount}),
  setCurrentPage: (page: number) => ({ type: SET_СURRENT_PAGE, page }),
  setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter }),
  toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
export type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {

 return async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  dispatch(actions.setFilter(filter));

    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalItemsCount(data.totalCount));
  }
}

type FollowUnfollowFlowActionCreatorType = ReturnType<typeof actions.followSuccess> | ReturnType<typeof actions.unfollowSuccess>

const followUnfollowFlow = async (dispatch: DispatchType, 
                                  userId: number, 
                                  apiMethod: (userId: number) => Promise<ResponseType>, 
                                  actionCreator: (userId: number) => FollowUnfollowFlowActionCreatorType) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId); 
    if( response.resultCode === 0 ) {
      dispatch(actionCreator(userId)); 
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
 
export const unfollow = (userId: number): ThunkType => {

 return async (dispatch, getState) => {
  await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
  }
}

export const follow = (userId: number): ThunkType => {

 return async (dispatch, getState) => {
  await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
  }
}


export default usersReducer;





