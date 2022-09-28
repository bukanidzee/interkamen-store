import Badge from 'react-bootstrap/Badge';

const OrdersLink = ({OrderComponent, body, is_staff, items, navigate}) =>
    <OrderComponent
      variant='dark'
      onClick={() => navigate('/orders')}>
      {body}
      <Badge bg='primary' text='dark'>
        {!is_staff && items.length}
      </Badge>
    </OrderComponent>
export default OrdersLink
