import OrderDetail from '../OrderDetail';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useUserAgent} from '../../../hooks/useUserAgent';
import cn from 'classnames';
import {useState, useEffect} from 'react'

const OffcanvasBox = ({orderId,
                       index,
                       orders,
                       setOrders,
                       status,
                       setChoosedOrder,
                       isChoosedLoading,
                       setIsChoosedLoading,
                       choosed,
                       setChoosed}) => {

  const handleHide = () => setChoosedOrder(-1)
  const {isProductCardSmall} = useUserAgent()


  const [show, setShow] = useState(false)

  useEffect(() => {
    if (orderId > -1){
      setShow(true)
    } else {
      setShow(false)
    }

  }, [orderId])

  return(
    <Offcanvas show={show}
               onHide={handleHide}
               placement='end'
               style={{width: '95vw'}}
               className={cn({'offcanvas-small': !isProductCardSmall})}>
      <Offcanvas.Header closeButton style={{marginTop: 100}}/>
      <Offcanvas.Body >
        {orderId > -1 &&
          <OrderDetail orderId={orderId}
                       index={index}
                       orders={orders}
                       setOrders={setOrders}
                       status={status}
                       setChoosedOrder={setChoosedOrder}
                       isChoosedLoading={isChoosedLoading}
                       setIsChoosedLoading={setIsChoosedLoading}
                       choosed={choosed}
                       setChoosed={setChoosed}/>}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffcanvasBox
