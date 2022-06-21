import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/state'

const MyPosts = (props) => {
  let postsElements = props.posts.map(p => 
    (<Post message={p.message} likesCount={p.likesCount}/>))

  let newPostElement = React.createRef();
  let addPost = () => {
    // props.addPost()
    props.dispatch(addPostActionCreator());
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    // props.updateNewPostText(text);
    let action = updateNewPostTextActionCreator(text)
    props.dispatch(action);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea onChange={onPostChange} ref={newPostElement} 
                  value={props.newPostText}/>
        <button onClick={addPost} className={s.btn}>Add post</button>
      </div>
      <div>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;
