import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { InitialStateProfilePhotosType, InitialStateProfileType } from '../types/types';
import {UsersType} from '../types/types' 


type UsersApiGetUsersGetType = {
  items: Array<UsersType>
  totalCount: number,
  error: null | string
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D,
  resultCode: RC, 
  messages: Array<string>

}

type AuthAPIMeGetType = {
  id: number,
  email: string,
  login: string
}
type AuthAPILoginPostType = {
  userId: number
}

type SecurityAPIGetCaptchaUrlType = {
  url: string
}

type SavePhotoResponseDataType = {
  photos: InitialStateProfilePhotosType
}

const instance =  axios.create({
  withCredentials: true, 
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {'API-KEY': 'dca26a06-d5b4-4cd5-9fac-078e66205e0a'},
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
    return instance
      .get<UsersApiGetUsersGetType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
      
      .then(response => response.data);
  },
      
  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then((response) => response.data)
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data) as Promise<ResponseType>
  },

  getProfile(userId: number ) {
    console.warn('obsolete method. plz profileAPI object.');
    return profileAPI.getProfile(userId);
  }

}
      

export const profileAPI = {      

  getProfile(userId: number) {
    return instance.get<InitialStateProfileType>(`profile/${userId}`).then((res) => res.data)
  },      

  getStatus(userId: number) {
    return instance.get<string>('profile/status/' + userId).then((res) => res.data)
  },      

  updateStatus(status: string) {
    return instance.put<ResponseType>('profile/status', {status: status}).then((res) => res.data)
  },      

  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put<ResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => res.data)
  },      

  saveProfile(profile: InitialStateProfileType) {
    return instance.put<ResponseType>('profile', profile).then((res) => res.data)
  },
}


export const authAPI = {
  me() {
    return instance.get<ResponseType<AuthAPIMeGetType>>(`auth/me`).then(res => res.data);
  },      

  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<ResponseType<AuthAPILoginPostType, ResultCodeEnum |  ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
    .then(response => response.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
}


export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<SecurityAPIGetCaptchaUrlType>(`security/get-captcha-url`).then(response => response.data);
  }
}

//CHAT-API 


const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[], 
  'status-changed': [] as StatusChangedSubscriberType[],
} 

let ws: WebSocket | null = null;

type EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout( createWsChannel, 2000 )
}


const messageHandler = (event: MessageEvent) => {
  const newMessages = JSON.parse(event.data)
  subscribers['messages-received'].forEach((subscriber) => subscriber(newMessages))
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.log('REFRESH YOUR PAGE, ASSHOLE!');
  
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(subscribers => subscribers(status))
}

function createWsChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

const cleanUp: () => void = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createWsChannel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    // ws?.close()
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

type MessagesReceivedSubscriberType = (messages: MessageBlockAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type MessageBlockAPIType = {
  userId: number
  userName: string
  message: string
  photo: string
}

export type StatusType = 'pending' | 'ready' | 'error'