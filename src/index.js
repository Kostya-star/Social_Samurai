import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/redux-state'
import {Provider} from './storeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = () => {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    </Provider>
  );
}

rerenderEntireTree();

store.subscribe(() => {
  rerenderEntireTree();
});

reportWebVitals();
