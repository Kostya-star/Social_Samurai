import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/redux-state'
import {Provider} from 'react-redux'

let h1 = document.createElement('h1');
h1.innerHTML = 'hey yo';
document.querySelector('body').
          appendChild(h1);

React.createElement('h1')          

setInterval(() => {
  store.dispatch({type: 'FAKE'})
}, 1000);

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    </Provider>
  );



reportWebVitals();
