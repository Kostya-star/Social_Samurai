import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserProfile } from './../../redux/profile-reducer';
import { WithAuthRedirect } from './../../hoc/WithAuthRedirect';

class ProfileContainer extends React.Component { 

  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) userId = 2;
    this.props.getUserProfile(userId);
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
})

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)

// export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);

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

export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent));