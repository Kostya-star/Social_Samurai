import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


type UsersPropsType = {
                      currentPage: number, 
                      totalItemsCount: number, 
                      pageSize: number, 
                      onPageChanged: (p: number) => void, 
                      users: Array<UsersType>, 
                      followingInProgress: Array<number>,
                      unfollow: (id: number) => void,
                      follow: (id: number) => void
                    }

let Users: React.FC<UsersPropsType> = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {

  return (
    <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                  totalItemsCount={totalItemsCount} pageSize={pageSize} />
                  <div>
        {
          users.map((u) => 
          <User 
            user={u} 
            followingInProgress={props.followingInProgress} 
            key={u.id} 
            unfollow={props.unfollow} 
            follow={props.follow}
          /> )
        }
      </div>
      </div>
  )
}

export default Users;