import {useState, useEffect} from 'react';
import ProductService from '../API/ProductService';
import {useAPI} from '../hooks/useAPI';
import {useFirstLoadingCheck} from '../hooks/useFirstLoadingCheck'
import {getPageCount} from '../utils/pages';
import {useSelector} from 'react-redux';
import {useUserAgent} from '../hooks/useUserAgent';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import ProductItemsList from '../components/product/ProductItemsList';
import ProductFilter from '../components/product/ProductFilter';
import LoadingOrMessage from '../components/UI/loading/LoadingOrMessage';
import LastElement from '../components/UI/universal/LastElement'

const Store = () => {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState({sort:'', query:''});
  const [isProductsLoading, setIsProductsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [choosed, setChoosed] = useState(0);
  const [isProductsReady, setIsProductsReady] = useState(false)
  const [status, setStatus] = useState('active')
  const {isProductCardMedium} = useUserAgent()

  const is_staff = useSelector(state => state.auth.is_staff)
  const navigate = useNavigate()
  const getProducts = useAPI(async () => {
    await ProductService.get_products({limit:12,
                                       offset:12*(page-1)-choosed,
                                       query:productFilter.query,
                                       sort:productFilter.sort,
                                       status:status},
      (response) => {
        if (page === 1) {
          setProducts([...response.results]);
        } else {
          setProducts([...products, ...response.results]);
        }
        setTotalPages(getPageCount(response.count + choosed, 12));
        setTotalCount(response.count + choosed);
        setIsProductsReady(true)
      }
    )
  }, setIsProductsLoading);

  const callback = async () => {
    setIsProductsReady(false)
    setChoosed(0)
    if (page === 1){
      await getProducts()
    }
    else if (page>1) {
      setPage(1);
    }
  }

  useFirstLoadingCheck(callback, [productFilter, status])

  useEffect(() => {
    getProducts();
  }, [page]);

  return(
        <div>
          <h1 className='page-header'>Каталог</h1>
          {is_staff &&
            <>
              <div style={{position:'absolute',
                           top:5,
                           right:5}}>
                <Button onClick={() => navigate('create')}>
                  {isProductCardMedium ? '+ Добавить новый продукт' :
                                         '+ Добавить'}
                </Button>
              </div>
              <Tabs
                  className = 'mb-3'
                  defaultActiveKey={status}
                  onSelect={k => setStatus(k)}
                >
                  <Tab eventKey="active" title="Действующие продукты"/>
                  <Tab eventKey="archive" title="Архивные"/>
              </Tabs>
            </>}
          <ProductFilter productFilter={productFilter}
                         setProductFilter={setProductFilter}/>
          <LoadingOrMessage condition={isProductsReady}
                            isLoading={isProductsLoading}
                            message='Продукты не найдены'>
            <ProductItemsList items={products}
                              place='store'
                              setProducts={setProducts}
                              setChoosed={setChoosed}
                              choosed={choosed}
                              status={status}/>
            <LastElement page={page}
                         setPage={setPage}
                         totalPages={totalPages}
                         totalCount={totalCount}
                         array={products}
                         listOfConditions={[isProductsLoading]}/>
          </LoadingOrMessage>
        </div>
  )
};

export default Store;

// offset:10*(page-1)-choosed,
