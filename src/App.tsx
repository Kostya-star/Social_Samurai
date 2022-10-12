import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { HashRouter, Routes, Route, Router, Link, NavLink } from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage'
import {Login as LoginPage}  from './components/Login/Login'
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './redux/redux-state';
import NOTFOUND from './components/common/NOTFOUND';

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Icon from '@ant-design/icons';


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
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;



    return (
      <Layout>
          <Content style={{padding: '0 50px'}}>
          <Header/>
              <Breadcrumb style={{margin: '16px 0'}}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                  <Sider className="site-layout-background" width={200}>
                      <Menu
                          mode="inline"
                          /*  defaultSelectedKeys={['7']}*/
                          /*  defaultOpenKeys={['sub1']}*/
                          style={{height: '100%'}}
                      >
                          <SubMenu key="sub1" /*icon={<UserOutlined/>}*/  title="My Profile">
                              <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                              <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
                              <Menu.Item key="3">option3</Menu.Item>
                              <Menu.Item key="4">option4</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub2" /*icon={<LaptopOutlined/>}*/  title="Developers">
                              <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                              <Menu.Item key="6">option6</Menu.Item>
                              <Menu.Item key="7">option7</Menu.Item>
                              <Menu.Item key="8">option8</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub3" /*icon={<NotificationOutlined/>}*/  title="subnav 3">
                              <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                              <Menu.Item key="10">option10</Menu.Item>
                              <Menu.Item key="11">option11</Menu.Item>
                              <Menu.Item key="12">option12</Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Sider>
                  <Content style={{padding: '0 24px', minHeight: 280}}>

                  <HashRouter>
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
                  </HashRouter >

                  </Content>
              </Layout>
          </Content>
          {/* <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2020 Created by IT-KAMASUTRA</Footer> */}
      </Layout>


      /*      <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                               element={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs'
                               element={() => <SuspendedDialogs /> }/>
                        <Route path='/profile/:userId?'
                               element={() => <SuspendedProfile /> }/>
                        <Route path='/users'
                               element={() => <UsersPage pageTitle={"Самураи"}/>}/>
                        <Route path='/login'
                               element={() => <LoginPage/>}/>
                        <Route path='*'
                               element={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>*/
  )




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
