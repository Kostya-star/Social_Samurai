let initialState = {};

export type InitialStateType = typeof initialState;

const sidebarReducer = (store = initialState, action: any): InitialStateType => {

  return store;
}

export default sidebarReducer;