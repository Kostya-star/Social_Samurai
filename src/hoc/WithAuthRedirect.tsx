import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { AppStateType } from "../redux/redux-state";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
} as MapPropsType);


type MapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {
  fake: () => void
}

export function withAuthRedirect <WCP> (WrappedComponent: React.ComponentType<WCP>) {
  function RedirectComponent(props: WCP & MapPropsType) {
      if (!props.isAuth) return <Navigate to='/login' />
      return <WrappedComponent {...props} />
  }
//@ts-ignore
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
  
  return ConnectedAuthRedirectComponent;
}



// import React from "react";
// import { Navigate } from "react-router-dom";
// import { connect } from 'react-redux';
// import { AppStateType } from "../redux/redux-state";

// let mapStateToPropsForRedirect = (state: AppStateType) => ({
//   isAuth: state.auth.isAuth,
// } as MapPropsType);


// type MapPropsType = {
//   isAuth: boolean
// }
// type DispatchPropsType = {
//   fake: () => void
// }

// export function withAuthRedirect <WCP> (WrappedComponent: React.ComponentType) {
//   const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
//     let {isAuth, ...restProps} = props
//       if (!isAuth) return <Navigate to='/login' />
//       return <WrappedComponent />
//   }

//   let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
  
//   return ConnectedAuthRedirectComponent;
// }