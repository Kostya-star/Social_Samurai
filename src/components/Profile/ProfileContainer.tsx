import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-state';


type ProfileContainerOwnProps = {
  router: any
  history: any
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: () => Promise<any>
}

// type PathParamsType = {
//   userId: string
// }
// interface PropsType extends RouteComponentProps<PathParamsType>  {
//   someString: string
// }

type PropsType = MapPropsType & DispatchPropsType & ProfileContainerOwnProps
class ProfileContainer extends React.Component<PropsType>{ 
  refreshProfile() {
    let userId: number | null | undefined | string = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      !userId && this.props.history.params('/login');
    }
    if(!userId) console.error('userId should exist in URI params or in state authorzedID');
    else {
      this.props.getUserProfile(userId as number);
      this.props.getStatus(userId as number); 
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if(this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    // console.log('render profile');
    return (
      <Profile {...this.props} 
                profile={this.props.profile}
                isOwner={!this.props.router.params.userId}
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}/>
    )
  }
}

function withRouter(Component: React.ComponentType) {
  function ComponentWithRouterProp(props: any) {
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
  
  let mapStateToProps = (state: AppStateType) => {
    return ({
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorizedUserId: state.auth.userId,
      isAuth: state.auth.isAuth,
    })
  }


  export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
