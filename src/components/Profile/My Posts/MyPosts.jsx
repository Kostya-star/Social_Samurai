import React from "react"; 
import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from './../../../utils/validators';
import { Textarea } from './../../common/FormsControls/FormsControls';

const MyPosts = (props) => {
  let postsElements = [...props.posts]
                      .reverse()
                      .map(p => (<Post message={p.message} likesCount={p.likesCount}/>))

  let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div>
        { postsElements }
      </div>
    </div>
  );
};

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <Field name='newPostText' component={Textarea} placeholder="enter your message" 
                validate={[required, maxLengthCreator(10)]}/>
        <button className={s.btn}>Add post</button>
      </form>
  )
}

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)



export default MyPosts;
