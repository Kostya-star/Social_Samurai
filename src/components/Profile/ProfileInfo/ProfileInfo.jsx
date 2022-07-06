import Preloader from "../../common/preloader/Preloader";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) return <Preloader/>
  return (
    <div>
      <div>
        <img
          className={s.nature_img}
          src="https://picfiles.alphacoders.com/278/278586.jpg"
        ></img>
      </div>
      <div className={s.descriptionBlock}> 
        ava + description 
        <img src={props.profile.photos.large}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
