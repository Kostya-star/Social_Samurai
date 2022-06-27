import React from "react"; 
import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";

const MyPosts = (props) => {
  let postsElements = props.posts.map(p => 
    (<Post message={p.message} likesCount={p.likesCount}/>))

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost()
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
    
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea onChange={onPostChange} ref={newPostElement} 
                  value={props.newPostText}/>
        <button onClick={onAddPost} className={s.btn}>Add post</button>
      </div>
      <div>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;
