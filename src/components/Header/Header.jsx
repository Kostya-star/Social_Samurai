import s from './Header.module.css'

const Header = () => {
 return <header className={s.header}>
    <img className = {s.header_img} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/02/9388351_orig.png?auto=format&q=60&fit=max&w=930"></img>
  </header>;
};

export default Header;