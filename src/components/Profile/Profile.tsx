import MyPosts from "./My Posts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My Posts/MyPostsContainer';
import {InitialStateProfileType} from '../../types/types'


type ProfilePropsType = {
  profile: InitialStateProfileType | null
  isOwner: boolean
  status: string
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: InitialStateProfileType) => Promise<any>
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
