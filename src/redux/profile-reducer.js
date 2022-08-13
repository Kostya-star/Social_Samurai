import { profileAPI, usersAPI } from './../api/api';


let ADD_POST = 'ADD_POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';
let SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'hey yo', likesCount: 15 },
    { id: 2, message: 'sup nigga', likesCount: 20 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (store = initialState, action) => {
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
        ...store,
        profile: {...store.profile, photos: action.photos},
      };
    }

    default:
      return store;
  }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => { 
  let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => { 
  let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
}


export default profileReducer;