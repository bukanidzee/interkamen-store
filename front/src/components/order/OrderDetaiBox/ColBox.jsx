import {useEffect, useRef} from 'react'
import {handleHeightChange} from '../../../utils/scrolling';
import OrderDetail from '../OrderDetail';
import {useUserAgent} from '../../../hooks/useUserAgent';
import cn from 'classnames'

const ColBox = ({orderId,
                 index,
                 orders,
                 setOrders,
                 status,
                 setChoosedOrder,
                 isChoosedLoading,
                 setIsChoosedLoading,
                 choosed,
                 setChoosed}) => {
  const orderBodyRef = useRef(null)

  const changeHeightFunc = handleHeightChange(orderBodyRef)

  const {isSidebarVisible} = useUserAgent()

  const orderActive = orderId > -1

  useEffect(() => {
    window.addEventListener('scroll', changeHeightFunc)
    return () =>
      window.removeEventListener('scroll', changeHeightFunc)
  }, [])

  return(
    <div className={cn('order-col-flex',
                       'order-box-flex',
                       {'current-active': orderActive})}>
      {orderActive &&
        <div ref={orderBodyRef}
          className={cn('sticky-top',
                        'order-box',
                        {'with-fixed-navbar': !isSidebarVisible})}>
        <OrderDetail orderId={orderId}
                     index={index}
                     orders={orders}
                     setOrders={setOrders}
                     status={status}
                     setChoosedOrder={setChoosedOrder}
                     isChoosedLoading={isChoosedLoading}
                     setIsChoosedLoading={setIsChoosedLoading}
                     changeHeightFunc={changeHeightFunc}
                     choosed={choosed}
                     setChoosed={setChoosed}/>
      </div>}
    </div>
  )
}

export default ColBox


// return(
//   <>
//     {orderId > -1 &&
//       <Col xs={7}>
//         <div ref={orderBodyRef}
//              className={classnames('sticky-top',
//                                    'order-box',
//                                    {'with-fixed-navbar': !isSidebarVisible})}>
//           <OrderDetail orderId={orderId}
//                        index={index}
//                        orders={orders}
//                        setOrders={setOrders}
//                        status={status}
//                        setChoosedOrder={setChoosedOrder}
//                        isChoosedLoading={isChoosedLoading}
//                        setIsChoosedLoading={setIsChoosedLoading}
//                        changeHeightFunc={changeHeightFunc}
//                        choosed={choosed}
//                        setChoosed={setChoosed}/>
//         </div>
//       </Col>}
//   </>
// )
// }
