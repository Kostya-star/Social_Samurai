import MyPosts from "./My Posts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My Posts/MyPostsContainer';
import {InitialStateProfileType} from '../../types/types'


type ProfilePropsType = {
  isOwner: boolean
  profile: /*null as*/ InitialStateProfileType | null
  status: string
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: () => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} 
                   updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
