import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../redux/dialogs-reducer';


const Dialogs = (props) => {

  let state = props.store.getState().dialogsPage;

  let dialogs = state.dialogs.map((d) => (<DialogItem name={d.name} id={d.id} />));
  let messages = state.messages.map((m) => (<Message message={m.message} id={m.id} />));
  let newMessageBody = state.newMessageBody;

  // let newText = React.createRef();

  // let addDialog = () => {
  //   // props.addDialog();
  //   props.dispatch(addDialogActionCreator());
  // }

  // let onDialogChange = () => {
  //   let text = newText.current.value;
  //   // props.updateNewDialogText(text)
  //   let action = updateNewDialogTextActionCreator(text)
  //   props.dispatch(action);
  // }

  let onSendMessageClick = (event) => {
    props.store.dispatch(sendMessageCreator());

  }

  let onNewMessageChange = (event) => {
    let body = event.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      <textarea onChange={onNewMessageChange} ref={newText} value={newMessageBody} placeholder='enter your message'/> <br />
      <button onClick={onSendMessageClick}>send</button>
      </div>
    </div>
  );
};

export default Dialogs;
