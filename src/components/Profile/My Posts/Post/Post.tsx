import s from "./Post.module.css";


type PostPropsType = {
  // id: number, 
  message: string, 
  likesCount: number
}
const Post: React.FC<PostPropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://uprostim.com/wp-content/uploads/2021/03/image096-74.jpg" />
      {props.message}
      <div>like! {props.likesCount}</div>
    </div>
  );
};

export default Post;
