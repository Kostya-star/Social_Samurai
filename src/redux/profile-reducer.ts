import { profileAPI, usersAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { InitialStatePostsType, InitialStateProfilePhotosType, InitialStateProfileType } from '../types/types';


let ADD_POST = 'ADD_POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';
let SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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

const profileReducer = (store = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
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
    case SET_USER_PROFILE: {
      return {
        ...store,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...store,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS: { 
      return {
        ...store, profile: {...store.profile, photos: action.photos} as InitialStateProfileType,
      } 
    }
    default:
      return store;
  }
}
type AddPostActionCreatorType = {type: typeof ADD_POST, newPostText: string}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText })

type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: InitialStateProfileType}
export const setUserProfile = (profile: InitialStateProfileType) => ({ type: SET_USER_PROFILE, profile })

type SetStatusType = {type: typeof SET_STATUS, status: string}
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status })

type SavePhotoSuccessType = {type: typeof SAVE_PHOTO_SUCCESS, photos: InitialStateProfilePhotosType}
export const savePhotoSuccess = (photos: InitialStateProfilePhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos })


export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => { 
  let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    } else {
        alert("Error:" + ' ' + response.data.messages)
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => { 
  let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: InitialStateProfileType) => async (dispatch: any, getState: any) => { 
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]} ));
      return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;