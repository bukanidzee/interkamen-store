import handleRequest from './Request';
import getUrl from './source';

export default class ProductService {
  static async get_products(p, callback) {
    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }
    const reqUrl = getUrl('product/')
    await handleRequest({url: reqUrl,
                         method: 'get',
                         params: params},
                         callback);
  };

  static async get_product(id, callback) {
    const reqUrl = getUrl(`product/${id}/`)
    await handleRequest({url: reqUrl,
                         method: 'get'},
                         callback);
  }

  static async update_product(id, data, callback) {
    const reqUrl = getUrl(`product/${id}/`)
    await handleRequest({url: reqUrl,
                         method: 'put',
                         data: data},
                         callback);
  }

  static async patch_product(id, data, callback) {
    const reqUrl = getUrl(`product/${id}/`)
    await handleRequest({url: reqUrl,
                         method: 'patch',
                         data: data},
                         callback);
  }

  static async create_product(data, callback) {
    const reqUrl = getUrl('product/')
    await handleRequest({url: reqUrl,
                         method: 'post',
                         data: data},
                         callback);
  }

  // static async delete_product(id, callback) {
  //   await handleRequest({url:`${API_ORIGIN}product/${id}`,
  //                        method: 'delete'}, callback);
  // }
}

// 'headers': {'Access-Control-Allow-Origin': 'http://localhost:3000/store'}
