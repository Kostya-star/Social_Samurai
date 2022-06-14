import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";

const MyPosts = (props) => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <div>
        <Post sms='hey yo' likecount='15'/>
        <Post sms='sup nigga' likecount='20'/>
      </div>
    </div>
  );
};

export default MyPosts;
