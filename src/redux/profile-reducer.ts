import { profileAPI, usersAPI } from '../api/api';
import { stopSubmit, FormAction } from 'redux-form';
import { InitialStatePostsType, InitialStateProfilePhotosType, InitialStateProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-state';


let initialState = {
  posts: [
    { id: 1, message: 'hey yo', likesCount: 15 },
    { id: 2, message: 'sup nigga', likesCount: 20 },
  ] as Array<InitialStatePostsType>,
  profile: null as InitialStateProfileType | null,
  status: '',
  newPostText: '',
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof profileActions>

const profileReducer = (store = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...store,
        posts: [...store.posts, newPost],
        newPostText: '',
      };
    }
    case 'SET_USER_PROFILE': {
      return {
        ...store,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...store,
        status: action.status,
      };
    }
    case 'SAVE_PHOTO_SUCCESS': { 
      return {
        ...store, profile: {...store.profile, photos: action.photos} as InitialStateProfileType,
      } 
    }
    default:
      return store;
  }
}

export const profileActions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const ),
  setUserProfile: (profile: InitialStateProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const ),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const ),
  // deletePost: (postId: number) => ({type:DELETE_POST, postId})
  savePhotoSuccess: (photos: InitialStateProfilePhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const ),
}


type ThunkType = BaseThunkType<ActionsType | FormAction>

export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {
  let data = await profileAPI.getProfile(userId)
    dispatch(profileActions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch, getState) => {
  let data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch, getState) => { 
  let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(profileActions.setStatus(status));
    } else {
        alert("Error:" + ' ' + data.messages)
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch, getState) => { 
  let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: InitialStateProfileType): ThunkType => async (dispatch, getState) => { 
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      // userId !== null ? dispatch(getUserProfile(userId)) : throw new Error('userId cant be null');
      if(userId !== null) dispatch(getUserProfile(userId))
      else throw new Error('userId cant be null');
    } else {
      dispatch(stopSubmit('edit-profile', {_error: data.messages[0]} ));
      return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;