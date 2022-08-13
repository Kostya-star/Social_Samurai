import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
  if (!profile) return <Preloader/>

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}> 
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/> <br/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>} <br/><br/>
        About me: {profile.aboutMe} <br/>
        Looking for a job: {profile.lookingForAJobDescription} <br/>
        <div className={s.proStatus}> status: <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/> </div> 
      </div>
    </div>
  );
};

export default ProfileInfo;
