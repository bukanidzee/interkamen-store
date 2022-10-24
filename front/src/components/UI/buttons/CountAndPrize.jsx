import CountButton from './CountButton';
import Price from '../universal/Price';


const CountAndPrize = ({count, setCount, productPrize}) => {

  return(
    <>
      <CountButton count={count} setCount={setCount} />
      <div style={{minWidth:'120px'}}>
        <Price price={productPrize*count} />
      </div>
    </>
  )
};

export default CountAndPrize;
