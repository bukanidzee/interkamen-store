import Price from '../../UI/universal/Price';
import Info from '../../UI/universal/Info';

const ColInfo = ({item}) =>
  <>
    <Info description='Количество' message={item.quantity}/>
    <Price price={item.prize}/>
  </>

export default ColInfo;
