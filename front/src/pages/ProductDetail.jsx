import OneButtonOrGroup from '../components/UI/buttons/OneButtonOrGroup';
import ProductDescAndControl from '../components/product/ProductDescAndControl';
import LoadingThenContent from '../components/UI/loading/LoadingThenContent';
import ImageInBox from '../components/UI/images/ImageInBox'
import ProductService from '../API/ProductService';
import {useAPI} from '../hooks/useAPI';

import {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getItemOfCurrentProduct} from '../redux_config/selectors/getItemOfCurrentProduct';
import { useParams, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const ProductDetail = () => {
  const {productId} = useParams()
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const selectItemOrUndefined = useMemo(getItemOfCurrentProduct, [])

  const [index, item] = useSelector(
    state => selectItemOrUndefined(state, productId))

  const getProduct = useAPI(async() => {
    await ProductService.get_product(
      productId,
      (response) => {
        setProduct(response)
      });
  }, setIsLoading)

  useEffect(() => {
    if (item) {
      setProduct(item.product)
    } else {
      getProduct()
    }
  }, [])

  const navButton = useMemo(() =>
    [{action: () => navigate(-1),
      name: 'Назад'}]
  )

  return(
    <LoadingThenContent isLoading={isLoading}>
      <Container>
        <Row>
          <Col sm={'auto'}>
            <OneButtonOrGroup buttons={navButton} withMargin/>
          </Col>
        </Row>
        <Row>
          <h1 className='page-header'>{product.title}</h1>
        </Row>
        <Row>
          {product.image &&
            <Col sm={4}>
              <ImageInBox src={product.image}
                          name={product.title}/>
            </Col>
          }
          <Col sm>
            <ProductDescAndControl product={product}
                                   productId={productId}
                                   item={item}
                                   index={index}/>
          </Col>
        </Row>
      </Container>
    </LoadingThenContent>
);
}

export default ProductDetail;
