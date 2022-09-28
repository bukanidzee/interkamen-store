import OrderCard from './OrderCard';
import {TransitionGroup, CSSTransition} from "react-transition-group";

const OrderList = ({orders,
                    choosedOrder,
                    setChoosedOrder}) => {

  return(
    <TransitionGroup>
      {orders.map((order, index) =>
        <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="product_item_card">
          <OrderCard
                     order={order}
                     number={index+1}
                     setChoosedOrder={setChoosedOrder}
                     choosedOrder={choosedOrder}/>
        </CSSTransition>
    )}
    </TransitionGroup>
  )
}

export default OrderList;
