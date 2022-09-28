import {useAPI} from '../../hooks/useAPI';
import {useFirstLoadingCheck} from '../../hooks/useFirstLoadingCheck';
import OrderService from '../../API/OrdersService';
import UserService from '../../API/UserService';
import {getPageCount} from '../../utils/pages';
import {ordersCallback} from '../../utils/callbacks/ordersCallback';
import {orderSortOptions} from '../../utils/buttons/orderSortOptions';
import '../../static/css/components/filter.css'
import classnames from 'classnames'
import {useUserAgent} from '../../hooks/useUserAgent';

import { useEffect, useState, useMemo, useCallback } from 'react';
import {useIsStaff} from '../../hooks/useAuthData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadingOrMessage from '../UI/loading/LoadingOrMessage';
import SelectBar from '../UI/bars/SelectBar';
import SearchBarWithOptions from '../UI/bars/SearchBarWithOptions';
import LastElement from '../UI/universal/LastElement'
import OrderList from './OrderList';
import OrderDetailBox from './OrderDetaiBox';

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

  const {isTabsBig} = useUserAgent()


  useEffect(() => {
    getOrders()
  }, [page])


  const sortOptions = useMemo(() => {
    return orderSortOptions(status)
  }, [status])

  return(
    <Container fluid>
      <div className={classnames('filter', {'compact': !isTabsBig})}>
          <SelectBar defaultValue='Сортировка по'
                     options = {sortOptions}
                     value = {filter.sort}
                     onChange = {(s) => setFilter({...filter, sort:s})}/>
        {is_staff &&
            <SearchBarWithOptions searchQuery={filter.userId}
                                  setSearchQuery={v => setFilter({...filter,
                                                                  userId:v})}
                                  fetchFunc={UserService.getUsers}/>}
      </div>
      <Row>
        <Col>
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
        <OrderDetailBox orderId={choosedOrder}
                        index={orders.indexOf(orders.find((el) => el.id===choosedOrder))}
                        orders={orders}
                        setOrders={setOrders}
                        status={status}
                        setChoosedOrder={setChoosedOrder}
                        isChoosedLoading={isChoosedLoading}
                        setIsChoosedLoading={setIsChoosedLoading}
                        choosed={choosed}
                        setChoosed={setChoosed}/>
      </Row>
    </Container>
  )
}

export default OrderRepresentation;
