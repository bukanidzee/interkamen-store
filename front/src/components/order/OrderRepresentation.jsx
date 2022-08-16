import {useAPI} from '../../hooks/useAPI';
import {useFirstLoadingCheck} from '../../hooks/useFirstLoadingCheck';
import OrderService from '../../API/OrdersService';
import UserService from '../../API/UserService';
import {getPageCount} from '../../utils/pages';
import {ordersCallback} from '../../utils/callbacks/ordersCallback';
import {handleHeightChange} from '../../utils/scrolling';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {useIsStaff} from '../../hooks/useAuthData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadingOrMessage from '../UI/loading/LoadingOrMessage';
import SelectBar from '../UI/bars/SelectBar';
import SearchBarWithOptions from '../UI/bars/SearchBarWithOptions';
import LastElement from '../UI/universal/LastElement'
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

const OrderRepresentation = ({status}) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({userId:'', sort:''});
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [choosed, setChoosed] = useState(0);
  const [isOrdersReady, setIsOrdersReady] = useState(false)
  const [choosedOrder,setChoosedOrder] = useState(-1);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [isChoosedLoading, setIsChoosedLoading] = useState(false);
  const is_staff = useIsStaff()
  const getOrders = useAPI(async () => {
    await OrderService.get_orders(
      {limit:10,
       offset:10*(page-1)-choosed,
       status:status,
       sort:filter.sort,
       userId:filter.userId},
      (response) => {
        if (page === 1) {
          setOrders([...response.results]);
        } else {
          setOrders([...orders, ...response.results]);
        }
        setTotalPages(getPageCount(response.count + choosed, 10));
        setTotalCount(response.count + choosed);
        setIsOrdersReady(true)
      })
  }, setIsOrdersLoading);

  const callback = useCallback(
    ordersCallback(page,
                   setPage,
                   setIsOrdersReady,
                   getOrders,
                   setChoosedOrder,
                   setChoosed)
  , [getOrders])

  useFirstLoadingCheck(callback, [filter, status]);

  useEffect(() => {
    getOrders()
  }, [page])


  const sortOptions = useMemo(() => {
    return ['closed', 'dropped'].indexOf(status) !== -1 ?
      [{value: 'prize_plus', name:'Цена от наименьшей'},
       {value: 'prize_minus', name:'Цена от наибольшей'},
       {value: 'created_plus', name:'Дата создания от новейшего'},
       {value: 'created_minus', name:'Дата создания от cтарейшего'},
       {value: 'finished_plus', name:'Дата закрытия от новейшего'},
       {value: 'finished_minus', name:'Дата закрытия от старейшего'},]
       :
       [{value: 'prize_plus', name:'Цена от наименьшей'},
        {value: 'prize_minus', name:'Цена от наибольшей'},
        {value: 'created_plus', name:'Дата создания от новейшего'},
        {value: 'created_minus', name:'Дата создания от cтарейшего'},];
  }, [status])

  const orderBodyRef = useRef(null)

  const changeHeightFunc = handleHeightChange(orderBodyRef)

  useEffect(() => {
    window.addEventListener('scroll', changeHeightFunc)
    return () =>
      window.removeEventListener('scroll', changeHeightFunc)
  }, [])

  return(
    <Container>
      <Row>
        <Col sm='auto'>
          <SelectBar defaultValue='Сортировка по'
                     options = {sortOptions}
                     value = {filter.sort}
                     onChange = {(s) => setFilter({...filter, sort:s})}/>
        </Col>
        {is_staff &&
          <Col sm>
          <SearchBarWithOptions searchQuery={filter.userId}
                                setSearchQuery={v => setFilter({...filter,
                                                                userId:v})}
                                fetchFunc={UserService.getUsers}/>
          </Col>}
      </Row>
      <Row>
        <Col sm={true}>
          <LoadingOrMessage condition={isOrdersReady && orders.length}
                            isLoading={isOrdersLoading}
                            message='Извините, заказы данного статуса не найдены'>
            <OrderList orders={orders}
                       choosedOrder={choosedOrder}
                       setChoosedOrder={setChoosedOrder}/>
            <LastElement page={page}
                         setPage={setPage}
                         totalPages={totalPages}
                         totalCount={totalCount}
                         array={orders}
                         listOfConditions={[isOrdersLoading, isChoosedLoading]}/>
          </LoadingOrMessage>

        </Col>
        {choosedOrder >=0 &&
          <Col sm={7}>
            <div ref={orderBodyRef}
                 className='sticky-top'
                 style={{overflowY:'auto'}}>
              <OrderDetail orderId={choosedOrder}
                           index={orders.indexOf(orders.find((el) => el.id===choosedOrder))}
                           orders={orders}
                           setOrders={setOrders}
                           status={status}
                           setChoosedOrder={setChoosedOrder}
                           isChoosedLoading={isChoosedLoading}
                           setIsChoosedLoading={setIsChoosedLoading}
                           changeHeightFunc={changeHeightFunc}
                           choosed={choosed}
                           setChoosed={setChoosed}/>
            </div>
          </Col>
        }
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

export default OrderRepresentation;

// import Pagination from './UI/Pagination';
// <Pagination totalPages={totalPages}
//             totalCount={totalCount}
//             limit={limit}
//             setLimit={setLimit}
//             page={page}
//             setPage={setPage}/>

// useEffect(() => {
//   if (choosedOrder === -1) {
//     handleOrdersParamsChange(page,
//                              setPage,
//                              isFirstLoading,
//                              getOrders)
//   }
// }, [choosedOrder])
