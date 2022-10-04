import s from "./Dialogs.module.css";
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Navigate} from 'react-router-dom';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input, Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator } from "../../utils/validators";
import { required } from '../../utils/validators';
import { InitialStateType } from "../../redux/dialogs-reducer";
import { createField } from './../common/FormsControls/FormsControls';


type DialogsPropsType = {
  dialogsPage: InitialStateType
  sendMessage: (newMessageBody: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

  let state = props.dialogsPage;

  let dialogs = state.dialogs.map((d) => (<DialogItem name={d.name} key={d.id} id={d.id} />));
  let messages = state.messages.map((m) => (<Message message={m.message} id={m.id} key={m.id} />));
  // let newMessageBody = state.newMessageBody;

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  }

  // if (!props.isAuth) return <Navigate to={'/login'} />;

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

export type LoginFormValuesKeyOfType = Extract<keyof NewMessageFormValuesType, string> 

type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    {createField<LoginFormValuesKeyOfType>('enter your new message', 'newMessageBody', [required, maxLength50], Textarea)}
    <button>send</button>
  </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;
