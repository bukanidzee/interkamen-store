import handleRequest from './Request';
import {API_ORIGIN} from './source';

export default class UserService {
  static async login(data, callback) {
    await handleRequest({
      method:'post',
      url:`${API_ORIGIN}rest-auth/login/`,
      data:data
    }, callback)
  }

  static async logout(callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/logout/`,
    }, callback)
  }

  static async registration(data, callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/registration/`,
      data: data
    }, callback)
  }

  static async getUser(id, callback) {
    await handleRequest({
      method: 'get',
      url: `${API_ORIGIN}customuser/${id}`,
    }, callback)
  }

  static async getUsers(p, callback) {
    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }
    await handleRequest({
      method: 'get',
      params: params,
      url: `${API_ORIGIN}customuser/`,
    }, callback)
  }

  static async patchUser(id, data, callback) {
    await handleRequest({
      method: 'patch',
      url: `${API_ORIGIN}customuser/${id}/`,
      data: data
    }, callback)
  }

  static async emailConfirm(key, callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/registration/verify-email/`,
      data: {key: key}
    }, callback)
  }

  static async changePassword(data, callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/password/change/`,
      data: data
    }, callback)
  }

  static async resetPassword(data, callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/password/reset/`,
      data: data
    }, callback)
  }

  static async confirmResetPassword(data, callback) {
    await handleRequest({
      method: 'post',
      url: `${API_ORIGIN}rest-auth/password/reset/confirm/`,
      data: data
    }, callback)
  }
}
