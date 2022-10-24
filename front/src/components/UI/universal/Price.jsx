import '../../../static/css/UI/price.scss'

const Price = ({price}) => {
  return(
    <div className='price'>
      <span>Общая цена:&nbsp;</span>
      <span>{price} руб.</span>
    </div>
  )
}

export default Price
