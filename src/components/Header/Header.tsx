import s from './Header.module.css';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Layout, Button } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, AppStateType } from '../../redux/redux-state';
import { logout } from './../../redux/auth-reducer';



export const MainHeader: React.FC = () => {
  const {isAuth, login} = useSelector((state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }))

  const dispatch: AppDispatch = useDispatch();

  const onLogout= () => {
    dispatch(logout())
  }
  

  const { Header } = Layout;

 
 return (<Header className="header">
 <div className="logo" />
 <Row>

   <Col span={18}>
       <Menu
       theme="dark" 
       mode="horizontal" 
       // defaultSelectedKeys={['2']} 
       >
           <Menu.Item key='0'> <Link to='/profile/*'/> Main </Menu.Item>
       </Menu>
   </Col>
        { isAuth 
          ? <>
              <Col span={1}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Col>
              <Col span={5}>
                <Button onClick={onLogout}>Log out</Button>
              </Col>
            </> 
            : 
            <Col span={6}>
              <Button>
                <Link to={'/login'}>Login</Link> 
              </Button>
            </Col>}
 </Row>
</Header>
)
 
 
 
  // <header className={s.header}>
  //     <img className = {s.header_img} src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/02/9388351_orig.png?auto=format&q=60&fit=max&w=930"></img>
  //     <div className={s.loginBlock}>
  //       { isAuth 
  //       ? <div>{login} - <button onClick={logout}>Log out</button></div> 
  //       : <NavLink to={'/login'}>Login</NavLink> }
  //     </div>
  //   </header>;
};
