import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../redux/dialogs-reducer';


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogs = state.dialogs.map((d) => (<DialogItem name={d.name} key={d.id} id={d.id} />));
  let messages = state.messages.map((m) => (<Message message={m.message} id={m.id} key={m.id} />));
  let newMessageBody = state.newMessageBody;


  let onSendMessageClick = () => {
    props.sendMessage();
  }

  let onNewMessageChange = (event) => {
    let body = event.target.value;
    props.updateNewMessageBody(body);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      <textarea onChange={onNewMessageChange} value={newMessageBody} placeholder='enter your message'/> <br />
      <button onClick={onSendMessageClick}>send</button>
      </div>
    </div>
  );
};

export default Dialogs;
