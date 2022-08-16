export const ordersCallback = (page,
                               setPage,
                               setIsOrdersReady,
                               getOrders,
                               setChoosedOrder,
                               setChoosed) =>
  async () => {
    setIsOrdersReady(false)
    setChoosedOrder(-1)
    setChoosed(0)
    if (page === 1){
      await getOrders();
    }
    else if (page>1) {
      setPage(1);
  }
}
