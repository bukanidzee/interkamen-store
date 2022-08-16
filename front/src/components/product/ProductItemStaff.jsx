import Col from 'react-bootstrap/Col';
import ProductDescStaff from './ProductDescStaff';



const ProductItemStaff = ({product,
                           index,
                           deleteChoosedProduct,
                           status}) => {

  return(
    <>
      <Col sm={'auto'}>
        Цена: {product.prize} руб.
      </Col>
      <Col sm>
        <ProductDescStaff productId={product.id}
                                 index={index}
                                 deleteChoosedProduct={deleteChoosedProduct}
                                 status={status}/>
      </Col>
    </>
  )
}

export default ProductItemStaff

// <Col sm>
//   <Button variant="outline-secondary"
//           onClick={() => deleteProduct()}>
//     Удалить продукт
//   </Button>
// </Col>

// import {useNavigate} from 'react-router-dom';
// import OneButtonOrGroup from '../UI/buttons/OneButtonOrGroup';
//
// import {useAPI} from '../../hooks/useAPI';
// import ProductService from '../../API/ProductService';
// const navigate = useNavigate()
// const patchProduct = useAPI(async (status) => {
//   await ProductService.patch_product(
//     product.id,
//     {status: status},
//     (response) => {
//       console.log(response)
//       deleteChoosedProduct(index)
//     }
//   )
// })
//
// const buttons = status === 'active' ?
//   [{name:'Изменить продукт',
//     action:() => {
//       navigate(`/store/${product.id}/change`)
//     }},
//     {name:'Архивировать продукт',
//      action:() => {
//         patchProduct('archive')
//     }}]
//   :
//   [{name:'Сделать продукт активным',
//     action:() => {
//       patchProduct('active')
//     }}]
