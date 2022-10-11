import {InjectedFormProps, reduxForm} from 'redux-form';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators';
import { connect, useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import s from './../common/FormsControls/FormsControls.module.css';
import { AppDispatch, AppStateType } from '../../redux/redux-state';


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


export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export type LoginFormValuesKeyOfType = Extract<keyof LoginFormValuesType, string> 




type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = () => {

  const {captchaUrl, isAuth} = useSelector(({auth}: AppStateType) => ({
    captchaUrl: auth.captchaUrl,
    isAuth: auth.isAuth,
  }))

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  }
  

  if(isAuth) {
    return <Navigate to={'/profile'}/>
  }


  return <div> 
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/> 
  </div>
}


















