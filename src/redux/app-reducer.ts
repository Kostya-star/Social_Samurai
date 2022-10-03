import { Dispatch } from "react";
import { getAuthUserData } from "./auth-reducer";
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from "./redux-state";


export type InitialStateType = typeof initialState 

type ActionsType = InferActionsTypes<typeof actions>

let initialState = {
  initialized: false,
};

const appReducer = (store = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...store,
        initialized: true,
      }

    default:
      return store;
  }
}

// type ActionsType = ReturnType<typeof actions.initializedSuccess>

export const actions = {
  initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}


// type DispatchType = Dispatch<ActionsType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all ([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  })
}


export default appReducer;