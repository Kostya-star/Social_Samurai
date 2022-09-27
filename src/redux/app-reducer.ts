import { getAuthUserData } from "./auth-reducer";

let INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean,
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (store = initialState, action: any): InitialStateType => {

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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all ([promise]).then(() => {
    dispatch(initializedSuccess());
  })
}


export default appReducer;