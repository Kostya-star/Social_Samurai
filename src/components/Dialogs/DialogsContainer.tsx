import {actions} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from "redux";
import { AppStateType } from '../../redux/redux-state';

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}


export default compose<React.ComponentType>(
  connect(mapStateToProps, 
    {...actions}),
  withAuthRedirect
)(Dialogs);
