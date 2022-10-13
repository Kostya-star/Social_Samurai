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
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, MenuProps, Row } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MainHeader } from './components/Header/Header';


// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}




class App extends Component <MapPropsType & DispatchPropsType> {
  // catchAllUnhandledErrors = (promiseRejectionEvent) => {
  //   alert('theres an error occured');
  //   // console.log(promiseRejectionEvent);
  // }

  componentDidMount() {
    this.props.initializeApp();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  // componentWillUnmount() {
  //   window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  // }

  render() {
    
    !this.props.initialized && <Preloader/>
    // if (!this.props.initialized) return <Preloader/>
  

    // return (
    //   <HashRouter>
    //         <div className='app-wrapper'>
    //           <HeaderContainer />
    //   <Suspense fallback={<Preloader/>}>
    //           <Navbar />
    //           <div className='app-wrapper-content'>
    //             <Routes>


    //               <Route path ='/profile/:userId?' 
    //                   element={<ProfileContainer />} />
    //               <Route path='/profile/*' 
    //                   element={<ProfileContainer />} />

    //               <Route path ='/dialogs/*' 
    //                   element={<DialogsContainer />} />
                  
    //               <Route path ='/news' 
    //                   element={<News/>} />
    //               <Route path ='/music' 
    //                   element={<Music/>} />
    //               <Route path ='/settings' 
    //                   element={<Settings/>} />

    //               <Route path ='/users' 
    //                   element={<UsersPage pageTitle={'Пользователи'}/>} />

    //               <Route path ='/login' 
    //                   element={<LoginPage/>} />

    //               <Route path ='*' 
    //                   element={<NOTFOUND/>} />


    //             </Routes>
    //           </div>
    //   </Suspense>
    //         </div>
    //       </HashRouter >
    //   )

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

                   <Route path ='*' 
                       element={<NOTFOUND/>} />


                 </Routes>
             </div>


            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>)




// return from antd!
  //   return(
  //   <Layout>
  //     <Header className="header">
  //       <div className="logo" />
  //       <Menu
  //         theme="dark"
  //         mode="horizontal"
  //         defaultSelectedKeys={['2']}
  //         style={{ lineHeight: '64px' }}
  //       >
  //         <Menu.Item key="1">nav 1</Menu.Item>
  //         <Menu.Item key="2">nav 2</Menu.Item>
  //         <Menu.Item key="3">nav 3</Menu.Item>
  //       </Menu>
  //     </Header>
  //   <Content>
  //   <Layout>
  //     <Sider width={200} style={{ background: '#fff' }}>
  //       <Menu
  //         mode="inline"
  //         defaultSelectedKeys={['1']}
  //         defaultOpenKeys={['sub1']}
  //         style={{ height: '100%', borderRight: 0 }}
  //       >

  //         <SubMenu key="sub1" title={ <span><Icon type="user" /> My Profile!!! </span> }>
  //           <Menu.Item key="1">
  //             <NavLink to="/profile" >Profile</NavLink>
  //           </Menu.Item>
  //           <Menu.Item key="2">
  //             <NavLink to="/dialogs">Messages</NavLink>
  //           </Menu.Item>
  //           <Menu.Item key="3">option3</Menu.Item>
  //           <Menu.Item key="4">option4</Menu.Item>
  //         </SubMenu>
  //         <SubMenu
  //           key="sub2"
  //           title={
  //             <span>
  //               <Icon type="laptop" />
  //               Developers!!!
  //             </span>
  //           }
  //         >
  //           <Menu.Item key="5">
  //             <NavLink to="/users">Users</NavLink>
  //           </Menu.Item>
  //           <Menu.Item key="6">option6</Menu.Item>
  //           <Menu.Item key="7">option7</Menu.Item>
  //           <Menu.Item key="8">option8</Menu.Item>
  //         </SubMenu>
  //         <SubMenu
  //           key="sub3"
  //           title={
  //             <span>
  //               <Icon type="notification" />
  //               subnav 3
  //             </span>
  //           }
  //         >
  //           <Menu.Item key="9">option9</Menu.Item>
  //           <Menu.Item key="10">option10</Menu.Item>
  //           <Menu.Item key="11">option11</Menu.Item>
  //           <Menu.Item key="12">option12</Menu.Item>
  //         </SubMenu>
  //       </Menu>
  //     </Sider>
  //     <Layout style={{ padding: '0 24px 24px' }}>
  //       <Breadcrumb style={{ margin: '16px 0' }}>
  //         <Breadcrumb.Item>Home</Breadcrumb.Item>
  //         <Breadcrumb.Item>List</Breadcrumb.Item>
  //         <Breadcrumb.Item>App</Breadcrumb.Item>
  //       </Breadcrumb>
  //       <Content
  //         style={{
  //           background: '#fff',
  //           padding: 24,
  //           margin: 0,
  //           minHeight: 280,
  //         }}
  //       >
          
  //         <HashRouter>
  //           <div className='app-wrapper-content'>
  //              <Routes>
  //                <Route path ='/profile/:userId?' 
  //                    element={<ProfileContainer />} />
  //                <Route path='/profile/*' 
  //                    element={<ProfileContainer />} />

  //                <Route path ='/dialogs/*' 
  //                    element={<DialogsContainer />} />
                  
  //                <Route path ='/news' 
  //                    element={<News/>} />
  //                <Route path ='/music' 
  //                    element={<Music/>} />
  //                <Route path ='/settings' 
  //                    element={<Settings/>} />

  //                <Route path ='/users' 
  //                    element={<UsersPage pageTitle={'Пользователи'}/>} />

  //                <Route path ='/login' 
  //                    element={<LoginPage/>} />

  //                <Route path ='*' 
  //                    element={<NOTFOUND/>} />
  //              </Routes>
  //          </div>
  //        </HashRouter >
     
  //       </Content>
  //     </Layout>
  //   </Layout>
  //     </Content>
  // </Layout>
  //   )
}
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initializeApp}) (App);
