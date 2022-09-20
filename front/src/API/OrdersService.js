import handleRequest from './Request';
import getUrl from './source';

export default class OrderService {
  static async get_orders(p, callback) {

    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }
    const reqUrl = getUrl(`order/`)
    await handleRequest({url:reqUrl,
                         method: 'get',
                         params: params
                       }, callback);
  };

  static async get_order(id, callback) {
    const reqUrl = getUrl(`order/${id}/`)
    await handleRequest({url: reqUrl,
                         method: 'get',
                       }, callback);
  }

  static async get_current_order(callback) {
    const reqUrl = getUrl(`order/current/`)
    await handleRequest({url:reqUrl,
                         method: 'get',
                       }, callback);
  }

  static async partial_update(id, data, callback) {
    // console.log(data)
    const reqUrl = getUrl(`order/${id}/`)
    await handleRequest({url:reqUrl,
                         method:'patch',
                         data:data}, callback);
  }
}
