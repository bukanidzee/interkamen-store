import handleRequest from './Request';
import getUrl from './source';

export default class UserService {
  static async login(data, callback) {
    const reqUrl = getUrl('rest-auth/login/')
    await handleRequest({
      method:'post',
      url: reqUrl,
      data:data
    }, callback)
  }

  static async logout(callback) {
    const reqUrl = getUrl('rest-auth/logout/')
    await handleRequest({
      method: 'post',
      url: reqUrl,
    }, callback)
  }

  static async registration(data, callback) {
    const reqUrl = getUrl('rest-auth/registration/')
    await handleRequest({
      method: 'post',
      url: reqUrl,
      data: data
    }, callback)
  }

  static async getUser(id, callback) {
    const reqUrl = getUrl(`customuser/${id}`)
    await handleRequest({
      method: 'get',
      url: reqUrl,
    }, callback)
  }

  static async getUsers(p, callback) {
    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }
    const reqUrl = getUrl('customuser/')
    await handleRequest({
      method: 'get',
      params: params,
      url: reqUrl,
    }, callback)
  }

  static async patchUser(id, data, callback) {
    const reqUrl = getUrl(`customuser/${id}/`)
    await handleRequest({
      method: 'patch',
      url: getUrl(reqUrl),
      data: data
    }, callback)
  }

  static async emailConfirm(key, callback) {
    const reqUrl = getUrl('rest-auth/registration/verify-email/')
    await handleRequest({
      method: 'post',
      url: reqUrl,
      data: {key: key}
    }, callback)
  }

  static async changePassword(data, callback) {
    const reqUrl = getUrl('rest-auth/password/change/')
    await handleRequest({
      method: 'post',
      url: reqUrl,
      data: data
    }, callback)
  }

  static async resetPassword(data, callback) {
    const reqUrl = getUrl('rest-auth/password/reset/')
    await handleRequest({
      method: 'post',
      url: reqUrl,
      data: data
    }, callback)
  }

  static async confirmResetPassword(data, callback) {
    const reqUrl = getUrl('rest-auth/password/reset/confirm/')
    await handleRequest({
      method: 'post',
      url:reqUrl,
      data: data
    }, callback)
  }
}
