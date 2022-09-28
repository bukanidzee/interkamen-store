import Col from 'react-bootstrap/Col';
import CountAndPrize from '../../UI/buttons/CountAndPrize';
import AddButton from './AddButton';


const BigCount = ({count, setCount, productPrize, place, fetchItem}) => {
  return (
    <>
      <Col sm={true}>
        <div className='count'>
          <CountAndPrize count={count}
                         setCount={setCount}
                         productPrize={productPrize}/>
        </div>
      </Col>
      {place==='store' &&
        <Col sm={'auto'}>
          <AddButton fetchItem={fetchItem}/>
        </Col>}
    </>
  )
}

export default BigCount
