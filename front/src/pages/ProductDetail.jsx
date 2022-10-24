import ProductDescAndControl from '../components/product/ProductDescAndControl';
import LoadingThenContent from '../components/UI/loading/LoadingThenContent';
import ImageInBox from '../components/UI/images/ImageInBox'
import ProductService from '../API/ProductService';
import {useAPI} from '../hooks/useAPI';

import {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {getItemOfCurrentProduct} from '../redux_config/selectors/getItemOfCurrentProduct';
import { useParams, useNavigate} from "react-router-dom";
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useUserAgent} from '../hooks/useUserAgent';
import MediaQuery from 'react-responsive';

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

  const {productDetailWide} = useUserAgent()

  useEffect(() => {
    if (item) {
      setProduct(item.product)
    } else {
      getProduct()
    }
  }, [])

  return(
    <LoadingThenContent isLoading={isLoading}>
      <div style={{position:'absolute',
                   top:5,
                   left:5}}>
        <Button onClick={() => navigate(-1)}>
          {'<< Назад'}
        </Button>
      </div>
      <Container fluid>
        <Row>
          <h1 className='page-header mt-3'>{product.title}</h1>
        </Row>
        <Row>
          <MediaQuery minWidth={productDetailWide}>
            {product.image &&
              <Col xs={5}>
                <ImageInBox src={product.image}
                            name={product.title}/>
              </Col>
            }
            <Col>
              <ProductDescAndControl product={product}
                                     productId={productId}
                                     item={item}
                                     index={index}/>
            </Col>
          </MediaQuery>
          <MediaQuery maxWidth={productDetailWide-1}>
            <Col>
              {product.image &&
                <ImageInBox src={product.image}
                            name={product.title}/>
              }
              <ProductDescAndControl product={product}
                                     productId={productId}
                                     item={item}
                                     index={index}/>
            </Col>
          </MediaQuery>
        </Row>
      </Container>
    </LoadingThenContent>
);
}

export default ProductDetail;
