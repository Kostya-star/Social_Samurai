import {InjectedFormProps, reduxForm} from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import s from './../common/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../redux/redux-state';


type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = 
({handleSubmit, error, captchaUrl}) => {

  return ( 
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesKeyOfType>('Email', 'email', [required], Input)}
      {createField<LoginFormValuesKeyOfType>('Password', 'password', [required], Input, {type: 'password'})}
      {createField<LoginFormValuesKeyOfType>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

      { captchaUrl && <img src={captchaUrl} />}
      { captchaUrl && createField<LoginFormValuesKeyOfType>('Symbol from the image', 'captcha', [required], Input, {})  }

      {error && <div className={s.formSummaryError}>
        {error}
      </div>
      }
      
      <div>
        <button>Login</button>
      </div>
    </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStateToPropsType = {
  captchaUrl: string | null,
  isAuth: boolean,
}

type MapDispatchToProps = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export type LoginFormValuesKeyOfType = Extract<keyof LoginFormValuesType, string> 

const Login: React.FC<MapStateToPropsType & MapDispatchToProps> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if(props.isAuth) {
    return <Navigate to={'/profile'}/>
  }

  return <div> 
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/> 
  </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login}) (Login);





















