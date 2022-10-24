import Badge from 'react-bootstrap/Badge';
import '../../../static/css/UI/orderslink.scss'

const OrdersLink = ({OrderComponent, body, is_staff, items, navigate}) =>
    <OrderComponent
      variant='primary'
      onClick={() => navigate('/orders')}
      className='orders-link'>
      {body}
      <Badge bg='dark' text='white'>
        {!is_staff && items.length}
      </Badge>
    </OrderComponent>
export default OrdersLink
