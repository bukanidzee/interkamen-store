import Col from 'react-bootstrap/Col';
import CountAndPrize from '../../UI/buttons/CountAndPrize';
import OneButtonOrGroup from '../../UI/buttons/OneButtonOrGroup';


const CompactCount = ({count, setCount, productPrize, buttons}) => {
  return (
    <>
      <Col className='d-flex flex-column align-items-center'>
        <CountAndPrize count={count}
                       setCount={setCount}
                       productPrize={productPrize}/>
        <OneButtonOrGroup buttons={buttons}/>
      </Col>
    </>
  )
}

export default CompactCount
