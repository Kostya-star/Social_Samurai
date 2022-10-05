import { createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import { reduxForm, InjectedFormProps } from 'redux-form';
import s from '../../common/FormsControls/FormsControls.module.css'
import { InitialStateProfileType } from '../../../types/types';
import { GetStringKeysType } from '../My Posts/MyPosts';


type ProfileDataFormPropsType = {
  profile: InitialStateProfileType, 
}

const ProfileDataForm: React.FC<InjectedFormProps<InitialStateProfileType, ProfileDataFormPropsType> 
& ProfileDataFormPropsType> = ({profile, handleSubmit, error}) => 
{
  return <form onSubmit={handleSubmit}>
    <div><button>save</button></div>
    {
      error && <div className={s.formSummaryError}>
      {error}
      </div>
      }
      <div> <b>Full name:</b> {createField('Full name', 'fullName', [], Input)} </div>

      <div> <b>Looking for a job:</b>{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})} </div>

      
      <div> <b>My professional skills:</b> {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)} </div>

      <div> <b>About me:</b> {createField('about me...', 'aboutMe', [], Textarea)} </div>

      <div> <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <div key={key}/*className={s.contact}*/>
          <b>{key}: {createField(key, 'contacts' + key, [], Input)}</b>
        </div>
      })} </div>
</form>
}

const ProfileDataFormReduxForm = reduxForm<InitialStateProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;