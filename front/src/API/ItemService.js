import handleRequest from './Request';
import getUrl from './source';

export default class ItemService {
  static async create(data, callback) {
    const reqUrl = getUrl(`item/`)
    await handleRequest({url:reqUrl,
                         method:'post',
                         data:data}, callback);
  };

  static async delete(id, callback) {
    const reqUrl = getUrl(`item/${id}/`)
    await handleRequest({url:reqUrl,
                         method:'delete'}, callback);
  }

  static async partial_update(id, data, callback) {
    const reqUrl = getUrl(`item/${id}/`)
    await handleRequest({url:reqUrl,
                         method:'patch',
                         data:data}, callback);
  }
}
