import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://uprostim.com/wp-content/uploads/2021/03/image096-74.jpg" />
      {props.message}
      <div>like! {props.likesCount}</div>
    </div>
  );
};

export default Post;
