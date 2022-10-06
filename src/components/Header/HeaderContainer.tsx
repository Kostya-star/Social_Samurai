import React from "react";
import Header, { HeaderMapDispatchPropsType, HeaderMapStatePropsType } from './Header';
import { connect } from 'react-redux';
import {logout } from '../../redux/auth-reducer';
import { AppStateType } from "../../redux/redux-state";


class HeaderContainer extends React.Component <HeaderMapStatePropsType & HeaderMapDispatchPropsType> {
  
  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<HeaderMapStatePropsType, HeaderMapDispatchPropsType, {}, AppStateType>(mapStateToProps, {logout}) (HeaderContainer);
