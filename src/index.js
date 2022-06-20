import reportWebVitals from './reportWebVitals';
import state, {subscribe} from'./redux/state';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addPost, updateNewPostText, updateNewDialogText, addDialog } from './redux/state'

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} 
      addPost={addPost} 
      addDialog={addDialog}
      updateNewPostText={updateNewPostText}
      updateNewDialogText={updateNewDialogText}/>
    </React.StrictMode>
  );
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree);

reportWebVitals();
