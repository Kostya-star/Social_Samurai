import MyPosts from "./My Posts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My Posts/MyPostsContainer';


const Profile = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} profile={props.profile} aboutMe={props.aboutMe} lookingForAJobDescription={props.lookingForAJobDescription}
                    status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
