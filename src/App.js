import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer'
import LoginPage from './components/Login/Login.jsx'
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/preloader/Preloader';


// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    
    // !this.props.initialized && <Preloader/>
    if (!this.props.initialized) return <Preloader/>


    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className='app-wrapper'>
              <HeaderContainer />
      <Suspense fallback={<Preloader/>}>
              <Navbar />
              <div className='app-wrapper-content'>
                <Routes>
                  
                  <Route path ='/profile/:userId' 
                  element={<ProfileContainer />} />
                  <Route path='/profile/*' element={<ProfileContainer />} />

                  <Route path ='/dialogs/*' 
                  element={<DialogsContainer />} />
                  
                  <Route path ='/news' element={<News/>} />
                  <Route path ='/music' element={<Music/>} />
                  <Route path ='/settings' element={<Settings/>} />

                  <Route path ='/users' 
                  element={<UsersContainer/>} />

                  <Route path ='/login' 
                  element={<LoginPage/>} />
                  
                </Routes>
              </div>
      </Suspense>
            </div>
          </BrowserRouter >
      )
}
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initializeApp}) (App);
