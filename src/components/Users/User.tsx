import userPhoto from '../../images/user.png'
import s from './users.module.css';
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../types/types';


type UserPropsType = {
  user: UsersType, 
  followingInProgress: Array<number>, 
  unfollow: (id: number) => void, 
  follow: (id: number) => void
}
const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
  return (
    <div>
            <span>
              <div>

                <NavLink to={'/profile/' + user.id}>
                  <img
                    src={user.photos.small != null ? user.photos.small : userPhoto } 
                    className={s.userPhoto}
                  />
                </NavLink>

              </div>
              <div>
                
                {user.followed 
                ? <button disabled={followingInProgress.some(id => id === user.id)} 
                onClick={() => {unfollow( user.id) }}> 
                Unfollow </button>



                  : <button disabled={followingInProgress.some(id => id === user.id)} 
                  onClick={() => {follow(user.id) }}> 
                  Follow </button> }

              </div>
            </span>

            <span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{"user.location.country"}</div>
                <div>{"user.location.city"}</div>
              </span>
            </span>
          </div>
        )  
}

export default User;