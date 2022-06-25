import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";
import {addDialogActionCreator, updateNewDialogTextActionCreator} from '../../redux/dialogs-reducer';


const Dialogs = (props) => {
  let dialogs = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  
  let messages = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));

  let newText = React.createRef();

  let addDialog = () => {
    // props.addDialog();
    props.dispatch(addDialogActionCreator());
  }

  let onDialogChange = () => {
    let text = newText.current.value;
    // props.updateNewDialogText(text)
    let action = updateNewDialogTextActionCreator(text)
    props.dispatch(action);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      <textarea onChange={onDialogChange} ref={newText} value={props.dialogsPage.newDialogPost}/> <br />
      <button onClick={addDialog}>send</button>
      </div>
    </div>
  );
};
let a;

export default Dialogs;
