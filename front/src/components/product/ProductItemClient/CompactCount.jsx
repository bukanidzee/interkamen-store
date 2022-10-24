import CountAndPrize from '../../UI/buttons/CountAndPrize';
import AddButton from './AddButton';


const CompactCount = ({count, setCount, productPrize, place, fetchItem}) => {
  return (
    <>
      <CountAndPrize count={count}
                     setCount={setCount}
                     productPrize={productPrize}/>
      {place==='store' &&
        <AddButton fetchItem={fetchItem}/>}
    </>
  )
}

export default CompactCount
