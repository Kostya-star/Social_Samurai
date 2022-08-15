import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from './../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component { 
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      !userId && this.props.history.push('/login');
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId); 
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    // console.log('render profile');
    return (
      <Profile {...this.props} 
                isOwner={!this.props.router.params.userId}
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}/>
    )
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
      {...props}
      router={{ location, navigate, params }}
      />
      );
    }
    
    return ComponentWithRouterProp;
  }
  
  let mapStateToProps = (state) => {
    // console.log('MSTPProfile');
    return ({
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorizedUserId: state.auth.userId,
      isAuth: state.auth.isAuth,
    })
  }


  export default compose(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
