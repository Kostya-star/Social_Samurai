let SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (store = initialState, action) => {

  switch (action.type) {

    case SET_USER_DATA:
      return {
        ...store,
        ...action.data,
        isAuth: true,
      }

    default:
      return store;
  }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } })

export default authReducer;