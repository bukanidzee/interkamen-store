import { createSelector } from 'reselect';

export const getItemOfCurrentProduct = () => createSelector(
  (state) => state.currentOrder.items,
  (_, productId) => productId,
  (items, productId) => {
    const item = items.find(item => item.product.id == productId)
    if (item) {
      return([items.indexOf(item), item])
    } else {
      return [undefined, undefined]
    }
  }
)
