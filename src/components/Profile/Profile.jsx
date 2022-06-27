import MyPosts from "./My Posts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My Posts/MyPostsContainer';


const Profile = (props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer store={props.store}/>
    </div>
  );
};

export default Profile;
