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
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import queryString from 'querystring'

//1 ---------------------------------
// import { AppStateType } from '../../redux/redux-state';
// import { ThunkDispatch } from "redux-thunk"
// import { AnyAction } from "redux";
// export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;


export const Users: React.FC = () => {
  

  const totalItemsCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsers)
  const followingInProgress = useSelector(getFollowingInProgress)
  
  const dispatch: AppDispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  
  React.useEffect(() => {
    //если не сработает querystring библиотека то попробовать использовать URLSearchParams API
    const parsed = queryString.parse(location.search.substr(1)) as {term: string; page: string; friend: string}
    
    let actualPage = currentPage
    let actualFilter = filter

    if(!!parsed.page) actualPage = Number(parsed.page)

    if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
    
    switch(parsed.friend) {
      case 'null': 
      actualFilter = {...actualFilter, friend: null}
      break;
      case 'true': 
      actualFilter = {...actualFilter, friend: true}
      break;
      case 'false': 
      actualFilter = {...actualFilter, friend: false}
      break;
    }
    
    dispatch(requestUsers(actualPage, pageSize, filter));
  }, [])
  
  React.useEffect(() => {
    navigate({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    })
    // navigate('/users')
  }, [filter, currentPage])
  
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

