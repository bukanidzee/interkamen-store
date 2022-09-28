import CountButton from './CountButton';



const CountAndPrize = ({count, setCount, productPrize}) => {

  return(
    <>
      <CountButton count={count} setCount={setCount} />
      <div style={{minWidth:'120px',
                   textAlign:'center'}}>
        {productPrize*count} руб.
      </div>
    </>
  )
};

export default CountAndPrize;
