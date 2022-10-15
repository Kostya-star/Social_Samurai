import './App.css';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { HashRouter, Routes, Route, Link, NavLink, Navigate, BrowserRouter } from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage'
import {Login as LoginPage}  from './components/Login/Login'
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './redux/redux-state';
import NOTFOUND from './components/common/NOTFOUND';
import s from "./components/Navbar/Navbar.module.css";

import 'antd/dist/antd.css';
import { LaptopOutlined, MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, MenuProps, Row } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MainHeader } from './components/Header/Header';


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends Component <MapPropsType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    
    !this.props.initialized && <Preloader/>

    // antd ---------------------------------------------------------------------
    const { Header, Content, Footer, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key: any = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );

    return ( <Layout>

        <MainHeader />

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>

              {/* <Menu */}
                 {/* mode="inline" */}
                 {/* defaultSelectedKeys={['1']} */}
                 {/* defaultOpenKeys={['sub1']} */}
                 {/* style={{ height: '100%' }} */}
                 {/* items={items2}> */}
                {/* <Menu.Item > */}
                    {/* smth here */}
                {/* </Menu.Item> */}
              {/* </Menu> */}

                <Menu 
                    mode="inline"
                    defaultSelectedKeys={['']} 
                    // defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}>
                <SubMenu key='sub1' icon={<UserOutlined/>} title='My Profile'>
                        <Menu.Item key='1'> <Link to='/profile/*'/> Profile </Menu.Item>
                        <Menu.Item key='2'> <Link to='/dialogs/*'/> Dialogs </Menu.Item>
                </SubMenu>
                <SubMenu key='sub2' icon={<LaptopOutlined/>} title='Developers'>
                        <Menu.Item key='3'> <Link to='/users/'/> devs </Menu.Item>
                </SubMenu>
                <SubMenu key='sub3' icon={<MessageOutlined/>} title='Chat'>
                        <Menu.Item key='4'> <Link to='/chat/'/> chat </Menu.Item>
                </SubMenu>
                </Menu>

            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
           
               <div className='app-wrapper-content'>
                 <Routes>

                   <Route path ='/profile/:userId?' 
                       element={<ProfileContainer />} />
                   <Route path='/profile/*' 
                       element={<ProfileContainer />} />

                   <Route path ='/dialogs/*' 
                       element={<DialogsContainer />} />
                  
                   <Route path ='/news' 
                       element={<News/>} />
                   <Route path ='/music' 
                       element={<Music/>} />
                   <Route path ='/settings' 
                       element={<Settings/>} />

                   <Route path ='/users' 
                       element={<UsersPage pageTitle={'Пользователи'}/>} />

                   <Route path ='/login' 
                       element={<LoginPage/>} />

                   <Route path ='/chat' 
                       element={<ChatPage/>} />

                   <Route path ='*' 
                       element={<NOTFOUND/>} />

                 </Routes>
             </div>

            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2022 Created by CONSTANTIN DANILOV</Footer>
      </Layout>)
}
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initializeApp}) (App);
