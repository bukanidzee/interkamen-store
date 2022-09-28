import {useEffect, useRef} from 'react'
import {handleHeightChange} from '../../../utils/scrolling';
import OrderDetail from '../OrderDetail';
import Col from 'react-bootstrap/Col';
import {useUserAgent} from '../../../hooks/useUserAgent';
import classnames from 'classnames'

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

  useEffect(() => {
    window.addEventListener('scroll', changeHeightFunc)
    return () =>
      window.removeEventListener('scroll', changeHeightFunc)
  }, [])

  return(
    <>
    {orderId > -1 &&
      <Col xs={7}>
        <div ref={orderBodyRef}
             className={classnames('sticky-top',
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
        </div>
      </Col>}
    </>
  )
}

export default ColBox
