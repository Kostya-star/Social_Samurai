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
import { useLocation, useSearchParams } from 'react-router-dom'
import * as queryString from 'querystring'



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

  // console.log('location.search-----', location.search);


  // useSearchParams hook is to get the url query string 
  // URLSearchParams gives us the object of 'useSearchParams'. .get('') is to get one exact key of the 'URLSearchParams' object and 
  // .entries('') is to get all the parameters from the query string URLSearchParams object. - WONT PROBABLY NEED THAT
  

  // const [searchParams] = useSearchParams();
  // const params = Object.fromEntries([...searchParams]) 
  // console.log('single-time read mounted params', params);
  

  React.useEffect(() => {
    // если не сработает querystring библиотека то попробовать использовать URLSearchParams API
    const parsed = queryString.parse(location.search.substr(1)) as { term?: string; page?: string; friend?: string }
    
    // console.log('query string parsed--------',parsed);
    
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

    // const currentParams = Object.fromEntries([...searchParams]) as {term: string; page: string; friend: string}
    // console.log('useEffect current search parameters', currentParams);

    // let actualPage = currentPage
    // let actualFilter = filter
    // if(!!currentParams.page) actualPage = Number(currentParams.page)
    // if(!!currentParams.term) actualFilter = {...actualFilter, term: currentParams.term}

    // switch(currentParams.friend) {
    //   case 'null': 
    //   actualFilter = {...actualFilter, friend: null}
    //   break;
    //   case 'true': 
    //   actualFilter = {...actualFilter, friend: true}
    //   break;
    //   case 'false': 
    //   actualFilter = {...actualFilter, friend: false}
    //   break;
    // }

    dispatch(requestUsers( actualPage, actualPage, actualFilter  ));
  }, [])

  React.useEffect(() => {
    // const query: QueryParamsType = {}
    // if (!!filter.term) query.term = filter.term
    //     if (filter.friend !== null) query.friend = String(filter.friend)
    //     if (currentPage !== 1) query.page = String(currentPage)
    navigate({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    })
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

