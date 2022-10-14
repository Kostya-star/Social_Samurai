import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../common/preloader/Preloader';
import { getIsFetching } from '../../redux/users-selectors';
import { Users } from './Users';


type UsersPagePropsType = {
  pageTitle: string
}
export const UsersPage: React.FC<UsersPagePropsType> = ({ pageTitle }) => {
    const isFetching = useSelector(getIsFetching)
    return <div>
            <h2>{pageTitle}</h2>
            {isFetching ? <Preloader/> 
              : null}
              <Users/>
          </div>

}
