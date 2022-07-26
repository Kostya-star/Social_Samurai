import { profileAPI, usersAPI } from './../api/api';


let ADD_POST = 'ADD-POST';
let SET_USER_PROFILE = 'SET_USER_PROFILE';
let SET_STATUS = 'SET_STATUS';

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

    default:
      return store;
  }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data));
  });
}

export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
}

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
}

export default profileReducer;