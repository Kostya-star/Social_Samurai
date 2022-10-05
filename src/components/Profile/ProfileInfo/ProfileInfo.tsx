import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.png'
import { ChangeEvent, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { InitialStateProfileContactsType, InitialStateProfileType } from "../../../types/types";


type ProfileInfoPropsType = {
  profile: InitialStateProfileType, 
  status: string, 
  updateStatus: (status: string) => void, 
  isOwner: boolean, 
  savePhoto: (file: File) => void, 
  saveProfile: (profile: InitialStateProfileType) => Promise<any>
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                      profile, 
                                                      status, 
                                                      updateStatus, 
                                                      isOwner, 
                                                      savePhoto, 
                                                      saveProfile}) => 
                                                      {
  let [editMode, setEditMode] = useState(false);     

  if (!profile) return <Preloader/>

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData: InitialStateProfileType) => {
    // todo: remove then
    saveProfile(formData).then(() => {

      setEditMode(false);
    })
    }
  

  return (
    <div>
      <div className={s.descriptionBlock}> 
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/> <br/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>} <br/><br/>

        {editMode  
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
            : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/> }

        <div className={s.proStatus}> <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/> </div> 
      </div>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: InitialStateProfileType, 
  isOwner: boolean, 
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
      <div> <b>Full name:</b> {profile.fullName} </div>

      <div> <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'} </div>

      {profile.lookingForAJob &&
      <div> <b>My professional skills:</b> {profile.lookingForAJobDescription} </div>}

      <div> <b>About me:</b> {profile.aboutMe} </div>

      <div> <b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
        return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof InitialStateProfileContactsType]}/>
      })} </div>
  </div>
}

type ContactPropsType = {
  contactTitle: string, 
  contactValue: string
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return <div className={s.contacts}> <b>{contactTitle}:</b> {contactValue} </div>
}

export default ProfileInfo;
