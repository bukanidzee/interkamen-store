import ItemService from '../API/ItemService';
import {useAPI} from './useAPI';
import {useAction} from './useAction'

export const useFetchItem = (product, count, item, index, callback) => {
  const { addItem, deleteItem, changeItem } = useAction()

  const fetchItem = useAPI(async (action) => {
    if (!count || count <= 0) {
      return
    }
    if (action === 'addItem') {
      await ItemService.create(
        {product:product.id,
         quantity:count},
        async (response) => {
          addItem(response)
          await callback(action)
        })
    } else if (action === 'deleteItem') {
      await ItemService.delete(
        item.id,
        async () => {
          deleteItem({prize:product.prize*count,
                        index:index})
          await callback(action)
        });
    } else if (action === 'changeItem') {
      await ItemService.partial_update(
        item.id,
        {quantity:count},
        async () => {
          changeItem({index:index, count:count})
          await callback(action)
        })
    }
  })

  return fetchItem
}
