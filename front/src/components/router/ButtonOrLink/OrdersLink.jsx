import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';

const OrdersLink = ({OrderComponent, body, is_staff, items, navigate}) =>
  <Nav className='ml-auto'>
    <OrderComponent
      variant='dark'
      onClick={() => navigate('/orders')}>
      {body}
      <Badge bg='primary' text='dark'>
        {!is_staff && items.length}
      </Badge>
    </OrderComponent>
  </Nav>

export default OrdersLink
