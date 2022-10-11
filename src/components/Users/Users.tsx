import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import  React from 'react';
import UsersSearchForm from './UsersSearchForm';
import { FilterType } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
import { requestUsers , follow, unfollow} from './../../redux/users-reducer';
import { AppDispatch } from '../../redux/redux-state';

//1 ---------------------------------
// import { AppStateType } from '../../redux/redux-state';
// import { ThunkDispatch } from "redux-thunk"
// import { AnyAction } from "redux";
// export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;


type UsersPropsType = {}

export const Users: React.FC<UsersPropsType> = ({}) => {
  

  const totalItemsCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)
  
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  }

  const follow = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>

        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                  totalItemsCount={totalItemsCount} pageSize={pageSize} />
                  
        <div>
        {
          users.map((u) => 
          <User 
            user={u} 
            followingInProgress={followingInProgress} 
            key={u.id} 
            unfollow={unfollow} 
            follow={follow}
          /> )
        }
      </div>
      </div>
  )
}

