import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import  React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


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
  


  // const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
    
  // }
  return (
    <div>

        <UsersSearchForm/>

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

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
}

type UsersSearchFormObjectType = {
  term: string
}

const UsersSearchForm = () => {
  const submit = (values: UsersSearchFormObjectType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
     
    }
  

  return (<Formik
    initialValues={{ term: '' }}
    validate={usersSearchFormValidate}
    onSubmit={submit}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="term" />
        <button type="submit" disabled={isSubmitting}>
          Search
        </button>
      </Form>
    )}
  </Formik>)
}

export default Users;