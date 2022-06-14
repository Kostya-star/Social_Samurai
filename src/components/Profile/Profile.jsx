import MyPosts from './My Posts/MyPosts';
import s from './Profile.module.css'

const Profile = () => {
   return <div>
        <div>
          <img className={s.nature_img} src='https://picfiles.alphacoders.com/278/278586.jpg'></img>
        </div>
        <div>
          ava + description
        </div>
        <MyPosts hey='yo'/>
      </div>
}

export default Profile;