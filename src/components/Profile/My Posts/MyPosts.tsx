import React from "react"; 
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required } from '../../../utils/validators';
import { Input } from '../../common/FormsControls/FormsControls';
import { createField } from './../../common/FormsControls/FormsControls';
import { InitialStatePostsType } from "../../../types/types";


export type MapPropsType = {
  posts: Array<InitialStatePostsType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = [...props.posts]
                      .reverse()
                      .map(p => (<Post key={p.id} message={p.message} likesCount={p.likesCount}/>))

  let onAddPost = (values: AddNewPostFormValuesType) => {
    props.addPost(values.newPostText)
  }
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      {/* @ts-ignore */}
      <AddNewPostForm onSubmit={onAddPost}/>
      <div>
        { postsElements }
      </div>
    </div>
  );
};

export type GetStringKeysType<T> = Extract<keyof T, string>   
type PropsType = {

}
type AddNewPostFormValuesType = {
  newPostText: string
}
export type AddNewPostFormValuesTypeKeys = GetStringKeysType<AddNewPostFormValuesType> 

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType> = 
      (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      { createField<AddNewPostFormValuesTypeKeys>('Email', 'newPostText', [required], Input) }
        {/* <Field name='newPostText' component={Textarea} placeholder="enter your message" 
                validate={[required, maxLengthCreator(10)]}/> */}
        <button className={s.btn}>Add post</button>
      </form>
  )
}

let AddNewPostFormRedux = reduxForm<AddNewPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)


export default MyPosts;
