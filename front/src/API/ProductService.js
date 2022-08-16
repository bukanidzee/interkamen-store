import handleRequest from './Request';
import {API_ORIGIN} from './source';

export default class ProductService {
  static async get_products(p, callback) {
    let params = {};
    for (let key in p) {
      if (p[key]) {
        params[key] = p[key]
      }
    }
    await handleRequest({url:`${API_ORIGIN}product/`,
                         method: 'get',
                         params: params}, callback);
  };

  static async get_product(id, callback) {
    await handleRequest({url:`${API_ORIGIN}product/${id}/`,
                         method: 'get'}, callback);
  }

  static async update_product(id, data, callback) {
    await handleRequest({url:`${API_ORIGIN}product/${id}/`,
                         method: 'put',
                         data: data}, callback);
  }

  static async patch_product(id, data, callback) {
    await handleRequest({url:`${API_ORIGIN}product/${id}/`,
                         method: 'patch',
                         data: data}, callback);
  }

  static async create_product(data, callback) {
    await handleRequest({url:`${API_ORIGIN}product/`,
                         method: 'post',
                         data: data}, callback);
  }

  // static async delete_product(id, callback) {
  //   await handleRequest({url:`${API_ORIGIN}product/${id}`,
  //                        method: 'delete'}, callback);
  // }
}

// 'headers': {'Access-Control-Allow-Origin': 'http://localhost:3000/store'}
