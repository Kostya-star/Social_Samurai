import axios, { AxiosResponse } from 'axios';
import { InitialStateProfileType } from '../types/types';

      
const instance =  axios.create({
  withCredentials: true, 
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {'API-KEY': 'dca26a06-d5b4-4cd5-9fac-078e66205e0a'},
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      
      .then(response => response.data);
  },
      

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
      

  follow(userId: number) {
    return instance.post(`follow/${userId}`, {})
  },
      

  getProfile(userId: number) {
    console.warn('obsolete method. plz profileAPI object.');
    return profileAPI.getProfile(userId);
  }

}
      

export const profileAPI = {      

  getProfile(userId: number) {
    return instance.get(`profile/${userId}`) 
  },      

  getStatus(userId: number) {
    return instance.get('profile/status/' + userId)
  },      

  updateStatus(status: string) {
    return instance.put('profile/status', {status: status})
  },      

  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },      

  saveProfile(profile: InitialStateProfileType) {
    return instance.put('profile', profile)
  },
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

type AuthAPIMeGetType = {
  data: {
    id: number,
    email: string,
    login: string
  }
  resultCode: ResultCodeEnum 
  messages: Array<string>
}
type AuthAPILoginPostType = {
  resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum,
  messages: Array<string>
  data: {
    userId: number
  }
}
type AuthAPILogoutDeleteType = {
  resultCode: number
  messages: Array<string>
  data: {}
}

export const authAPI = {
  me() {
    return instance.get<AuthAPIMeGetType>(`auth/me`).then(res => res.data);
  },      

  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<AuthAPILoginPostType>(`auth/login`, { email, password, rememberMe, captcha })
    .then(response => response.data);
  },
  logout() {
    return instance.delete<AuthAPILogoutDeleteType>(`auth/login`);
  },
}

type SecurityAPIGetCaptchaUrlType = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<SecurityAPIGetCaptchaUrlType>(`security/get-captcha-url`).then(response => response.data);
  }
}
