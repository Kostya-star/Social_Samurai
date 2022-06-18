import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";


const Dialogs = (props) => {
  let dialogs = props.state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  
  let messages = props.state.messages.map((m) => (
    <Message message={m.message} id={m.id} />
  ));
  let newText = React.createRef();
  let addNewText = () => {
   alert(newText.current.value) 
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      <textarea ref={newText}></textarea> <br />
      <button onClick={addNewText}>Create</button>
      </div>
    </div>
  );
};

export default Dialogs;
