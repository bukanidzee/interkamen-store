import Col from 'react-bootstrap/Col';
import CountAndPrize from '../../UI/buttons/CountAndPrize';
import AddButton from './AddButton';


const CompactCount = ({count, setCount, productPrize, place, fetchItem}) => {
  return (
    <Col sm className='d-flex flex-column justify-content-around'>
      <CountAndPrize count={count}
                     setCount={setCount}
                     productPrize={productPrize}/>
      {place==='store' &&
        <AddButton fetchItem={fetchItem}/>}
    </Col>
  )
}

export default CompactCount
