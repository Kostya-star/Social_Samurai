import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) return <Preloader/>
  return (
    <div>
      {/* <div>
        <img className={s.nature_img} src="https://picfiles.alphacoders.com/278/278586.jpg"/>
      </div> */}
      <div className={s.descriptionBlock}> 
        <img src={props.profile.photos.large} /> <br/>
        About me: {props.profile.aboutMe} <br/>
        Looking for a job: {props.profile.lookingForAJobDescription}
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>  
      </div>
    </div>
  );
};

export default ProfileInfo;
