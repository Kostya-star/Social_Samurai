import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";


const Dialogs = (props) => {
  let dialogs = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  
  let messages = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));
  let newText = React.createRef();
  // let addNewText = () => {
  //  alert(newText.current.value) 
  // }

  let addDialog = () => {
    props.addDialog();
  }

  let onDialogChange = () => {
    let text = newText.current.value;
    props.updateNewDialogText(text)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      <textarea onChange={onDialogChange} ref={newText} value={props.dialogsPage.newDialogPost}/> <br />
      <button onClick={addDialog}>Create</button>
      </div>
    </div>
  );
};

export default Dialogs;
