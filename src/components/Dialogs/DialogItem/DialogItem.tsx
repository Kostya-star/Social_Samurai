import s from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";


type DialogItemPropsType = {
  id: number 
  name: string
}
const DialogItem: React.FC<DialogItemPropsType> = ({id, name}) => {
  let path = "/dialogs/" + id;
  return (
    <div className={s.dialog}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
