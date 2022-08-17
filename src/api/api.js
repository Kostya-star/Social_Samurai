import * as axios from 'axios';


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

  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
  },

  follow(userId) {
    return instance.post(`follow/${userId}`, {})
  },

  getProfile(userId) {
    console.warn('obsolete method. plz profileAPI object.');
    return profileAPI.getProfile(userId);
  }

}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`) 
  },
  getStatus(userId) {
    return instance.get('profile/status/' + userId)
  },
  updateStatus(status) {
    return instance.put('profile/status', {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile) {
    return instance.put('profile', profile)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
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
