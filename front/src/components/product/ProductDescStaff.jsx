import {useNavigate} from 'react-router-dom';
import OneButtonOrGroup from '../UI/buttons/OneButtonOrGroup';

import {useAPI} from '../../hooks/useAPI';
import ProductService from '../../API/ProductService';


const ProductDescStaff = ({productId,
                                  index,
                                  deleteChoosedProduct,
                                  status}) => {
  const navigate = useNavigate()
  const patchProduct = useAPI(async (status) => {
    await ProductService.patch_product(
      productId,
      {status: status},
      () => {
        if (deleteChoosedProduct) {
          deleteChoosedProduct(index)
        }
      }
    )
  })

  const buttons = status === 'active' ?
      [{name:'Изменить продукт',
        action:() => {
          navigate(`/store/${productId}/change`)
        }},
        {name:'Архивировать продукт',
         action:() => {
          patchProduct('archive')
        }}]
      :
      [{name:'Сделать продукт активным',
        action:() => {
          patchProduct('active')
        }}]

  return(
    <OneButtonOrGroup buttons={buttons}/>
  )
}

export default ProductDescStaff
