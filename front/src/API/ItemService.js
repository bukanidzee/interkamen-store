import handleRequest from './Request';
import {API_ORIGIN} from './source';

export default class ItemService {
  static async create(data, callback) {
    await handleRequest({url:`${API_ORIGIN}item/`,
                         method:'post',
                         data:data}, callback);
  };

  static async delete(id, callback) {
    await handleRequest({url:`${API_ORIGIN}item/${id}/`,
                         method:'delete'}, callback);
  }

  static async partial_update(id, data, callback) {
    await handleRequest({url:`${API_ORIGIN}item/${id}/`,
                         method:'patch',
                         data:data}, callback);
  }
}
