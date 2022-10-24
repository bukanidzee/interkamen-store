import Col from 'react-bootstrap/Col';
import Price from '../../UI/universal/Price';
import Info from '../../UI/universal/Info';

const RowInfo = ({item}) =>
  <>
    <Col xs='auto'>
      <Info description='Количество' message={item.quantity}/>
    </Col>
    <Col className='d-flex justify-content-end'>
      <Price price={item.prize}/>
    </Col>
  </>

export default RowInfo;
