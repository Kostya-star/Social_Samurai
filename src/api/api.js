import * as axios from 'axios';


const instance =  axios.create({
  withCredentials: true, 
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {'API-KEY': '59d216c6-fec2-46dc-a63b-e994e6ec4774'},
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
  }

}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  }
}
