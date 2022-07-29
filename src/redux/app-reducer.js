import { getAuthUserData } from "./auth-reducer";

let INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false,
};

const appReducer = (store = initialState, action) => {

  switch (action.type) {

    case INITIALIZED_SUCCESS:
      return {
        ...store,
        initialized: true,
      }

    default:
      return store;
  }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  Promise.all ([promise]).then(() => {
    dispatch(initializedSuccess());
  })
}


export default appReducer;