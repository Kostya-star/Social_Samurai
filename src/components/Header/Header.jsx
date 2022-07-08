import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
 return <header className={s.header}>
    <img className = {s.header_img} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/02/9388351_orig.png?auto=format&q=60&fit=max&w=930"></img>
    <div className={s.loginBlock}>
      { props.isAuth ? props.login 
      : <NavLink to={'/login'}>Login</NavLink> }
    </div>
  </header>;
};

export default Header;