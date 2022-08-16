import CountButton from './CountButton';

import '../../../static/css/UI/count.css';

const CountAndPrize = ({count, setCount, productPrize, classes}) => {

  return(
    <div className={classes}>
      <CountButton count={count} setCount={setCount} />
      <div style={{minWidth:'120px',
                   textAlign:'center'}}>
        {productPrize*count} руб.
      </div>
    </div>
  )
};

export default CountAndPrize;
