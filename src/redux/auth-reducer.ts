import {authAPI, ResultCodeEnum, ResultCodeForCaptchaEnum, securityAPI} from '../api/api'
import {stopSubmit} from 'redux-form';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-state';


let SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA' as const;
let GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS' as const;

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (store = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {

    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...store,
        ...action. payload,
      }

    default:
      return store;
  }
}

type ActionsType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>

type SetAuthUserDataPayloadActionType = {
    userId: number | null, 
    email: string | null, 
    login: string | null, 
    isAuth: boolean 
}
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA, 
  payload: SetAuthUserDataPayloadActionType
}

export const setAuthUserData = (userId: number | null, 
                                email: string | null, 
                                login: string | null, 
                                isAuth: boolean): SetAuthUserDataActionType => ({ 
  type: SET_USER_DATA, payload: { userId, email, login, isAuth } 
});


type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS, 
  payload: { captchaUrl: string } 
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({ 
  type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } 
});




type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType => async (dispatch, getState) => {
  let meData = await authAPI.me();
    if (meData.resultCode === ResultCodeEnum.Success) {
      let {id, login, email} = meData.data;
      dispatch(setAuthUserData(id, email, login, true));
    } 
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => 
async (dispatch, getState) => {
  let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData())
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let message = loginData.messages.length > 0 ? loginData.messages[0] : 'wrong credentials, try again!';
      //@ts-ignore
      dispatch(stopSubmit('login', { _error: message }));
      // function stopSubmit(formName: string, errorObject?: {}): any
    } 
}

export const getCaptchaUrl = (): ThunkType => async (dispatch, getState) => {
  const captchaData = await securityAPI.getCaptchaUrl();
  const captchaUrl = captchaData.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch, getState) => {
  let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    } 
}

export default authReducer;