import handleRequest from './Request';
import {API_ORIGIN} from './source';

export default class OrderService {
  static async get_orders(p, callback) {

    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }

    await handleRequest({url:`${API_ORIGIN}order/`,
                         method: 'get',
                         params: params
                       }, callback);
  };

  static async get_order(id, callback) {
    await handleRequest({url:`${API_ORIGIN}order/${id}/`,
                         method: 'get',
                       }, callback);
  }

  static async get_current_order(callback) {
    await handleRequest({url:`${API_ORIGIN}order/current/`,
                         method: 'get',
                       }, callback);
  }

  static async partial_update(id, data, callback) {
    // console.log(data)
    await handleRequest({url:`${API_ORIGIN}order/${id}/`,
                         method:'patch',
                         data:data}, callback);
  }
}
