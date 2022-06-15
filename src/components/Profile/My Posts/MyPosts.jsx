import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";

let postData = [
  {id: 1, message: 'hey yo', likesCount: 15},
  {id: 2, message: 'sup nigga', likesCount: 20},
]

let postsElements = postData
  .map(p => (<Post message={p.message} likesCount={p.likesCount}/>
))

const MyPosts = (props) => {
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <textarea></textarea>
        <button className={s.btn}>Add post</button>
      </div>
      <div>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;
