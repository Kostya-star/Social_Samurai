import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage'
import {Login as LoginPage}  from './components/Login/Login'
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/preloader/Preloader';
import { AppStateType } from './redux/redux-state';
import NOTFOUND from './components/common/NOTFOUND';


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
  

    return (
      <HashRouter>
            <div className='app-wrapper'>
              <HeaderContainer />
      <Suspense fallback={<Preloader/>}>
              <Navbar />
              <div className='app-wrapper-content'>
                <Routes>


                  <Route path ='/profile/:userId' 
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
      </Suspense>
            </div>
          </HashRouter >
      )
}
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initializeApp}) (App);
