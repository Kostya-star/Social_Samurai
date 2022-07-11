import * as axios from 'axios';

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance =  axios.create({
  withCredentials: true, 
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {'API-KEY': '59d216c6-fec2-46dc-a63b-e994e6ec4774'},
});

export const usersAPI = {
  getUsers (currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => {
        return response.data;
      });
  }
}

export const getUsers2 = (currentPage = 1, pageSize = 10) => {
  return instance
    .get(`follow?page=${currentPage}&count=${pageSize}`,
    ).then(response => {
      return response.data;
    });

}