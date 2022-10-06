import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";


type MessagePropsType = {
  message: string
} 
const Message: React.FC<MessagePropsType> = ({message}) => {
  return <div className={s.message}>{message}</div>;
};

export default Message;
