import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from "react";
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../redux/dialogs-reducer';
import {Navigate} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from './../common/FormsControls/FormsControls';
import { maxLengthCreator } from "../../utils/validators";
import { required } from './../../utils/validators';


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogs = state.dialogs.map((d) => (<DialogItem name={d.name} key={d.id} id={d.id} />));
  let messages = state.messages.map((m) => (<Message message={m.message} id={m.id} key={m.id} />));
  let newMessageBody = state.newMessageBody;

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  }

  if (!props.isAuth) return <Navigate to={'/login'} />;

  return ( 
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}

        <AddMessageFormRedux onSubmit={addNewMessage}/>

      </div>
    </div>
  );
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder='enter your message'/> <br />
    <button>send</button>
  </form>
  )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;
