import React, { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/redux-state'
import {Provider} from 'react-redux'
import { useNavigate } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Preloader from './components/common/preloader/Preloader';





// setInterval(() => {
//   store.dispatch({type: 'FAKE'})
// }, 1000);
const root = ReactDOM.createRoot(document.getElementById('root') as Element);
  root.render(
    <HashRouter>
      <Suspense fallback={<Preloader/>}>
        <Provider store={store}>
            <App store={store} />
        </Provider>
      </Suspense>
    </HashRouter>
  );



reportWebVitals();

