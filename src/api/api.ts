import * as axios from 'axios';

      // @ts-ignore

const instance =  axios.create({
  withCredentials: true, 
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {'API-KEY': 'dca26a06-d5b4-4cd5-9fac-078e66205e0a'},
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      // @ts-ignore
      .then(response => response.data);
  },
      // @ts-ignore

  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },
      // @ts-ignore

  follow(userId) {
    return instance.post(`follow/${userId}`, {})
  },
      // @ts-ignore

  getProfile(userId) {
    console.warn('obsolete method. plz profileAPI object.');
    return profileAPI.getProfile(userId);
  }

}
      // @ts-ignore

export const profileAPI = {      // @ts-ignore

  getProfile(userId) {
    return instance.get(`profile/${userId}`) 
  },      // @ts-ignore

  getStatus(userId) {
    return instance.get('profile/status/' + userId)
  },      // @ts-ignore

  updateStatus(status) {
    return instance.put('profile/status', {status: status})
  },      // @ts-ignore

  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },      // @ts-ignore

  saveProfile(profile) {
    return instance.put('profile', profile)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },      // @ts-ignore

  login(email, password, rememberMe = false, captcha: string | null = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  }
}
