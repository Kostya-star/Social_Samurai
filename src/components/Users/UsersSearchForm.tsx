import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../redux/users-reducer';


const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
}

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(({onFilterChanged}) => {

  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }

    onFilterChanged(filter)
    setSubmitting(false)
    }
  
  return (<Formik
    initialValues={{ term: '', friend: 'null'}}
    validate={usersSearchFormValidate}
    //@ts-ignore
    onSubmit={submit}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="term" />
        <Field as="select" name="friend">
             <option value="null">All</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
        </Field>
        <button type="submit" disabled={isSubmitting}>
          Search
        </button>
      </Form>
    )}
  </Formik>)
})

export default UsersSearchForm;
