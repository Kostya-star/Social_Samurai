import s from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={s.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

let dialogsData = [
  { id: 1, name: "Costya" },
  { id: 2, name: "Vanya" },
  { id: 3, name: "Igor" },
  { id: 4, name: "Liuba" },
  { id: 5, name: "Julia" },
];

let messagesData = [
  { id: 1, message: "sup yo" },
  { id: 2, message: "ur freaking nigga" },
  { id: 3, message: "shut the fuck up asshole" },
  { id: 4, message: "fuck u nigga" },
  { id: 5, message: "speak eng!" },
];

let dialogs = dialogsData.map((d) => (
  <DialogItem name={d.name} id={d.id} />
));

let messages = messagesData.map((m) => (
  <Message message={m.message} id={m.id} />
));

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
          {dialogs}
      </div>

      <div className={s.messages}>
        {messages}
      </div>
    </div>
  );
};

export default Dialogs;
