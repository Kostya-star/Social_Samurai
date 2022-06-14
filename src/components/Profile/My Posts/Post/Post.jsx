import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://uprostim.com/wp-content/uploads/2021/03/image096-74.jpg" />
      {props.sms}
      <div>like! {props.likecount}</div>
    </div>
  );
};

export default Post;
