import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/redux-state'
import {Provider} from 'react-redux'


// setInterval(() => {
//   store.dispatch({type: 'FAKE'})
// }, 1000);

const root = ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    </Provider>
  );



reportWebVitals();
