import Col from 'react-bootstrap/Col';
import CountAndPrize from '../../UI/buttons/CountAndPrize';
import OneButtonOrGroup from '../../UI/buttons/OneButtonOrGroup';


const BigCount = ({count, setCount, productPrize, buttons}) => {
  return (
    <>
      <Col className='count' sm>
        <CountAndPrize count={count}
                       setCount={setCount}
                       productPrize={productPrize}/>
      </Col>
      <Col sm>
        <OneButtonOrGroup buttons={buttons}/>
      </Col>
    </>
  )
}

export default BigCount
