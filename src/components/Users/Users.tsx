import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import  React from 'react';
import UsersSearchForm from './UsersSearchForm';
import { FilterType } from '../../redux/users-reducer';


type UsersPropsType = {
                      currentPage: number, 
                      totalItemsCount: number, 
                      pageSize: number, 
                      onPageChanged: (p: number) => void, 
                      onFilterChanged: (filter: FilterType) => void
                      users: Array<UsersType>, 
                      followingInProgress: Array<number>,
                      unfollow: (id: number) => void,
                      follow: (id: number) => void
                    }

let Users: React.FC<UsersPropsType> = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {
  


  // const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
    
  // }
  return (
    <div>

        <UsersSearchForm onFilterChanged={props.onFilterChanged} />

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