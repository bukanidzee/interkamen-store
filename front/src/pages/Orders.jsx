import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import OrderRepresentation from '../components/order/OrderRepresentation';
import CurrentOrderDetail from '../components/order/CurrentOrderDetail';
import { useSelector } from 'react-redux';
import {useState} from 'react'
import {useUserAgent} from '../hooks/useUserAgent';

const Orders = () => {
  const is_staff = useSelector(state => state.auth.is_staff)
  let [status, setStatus] = useState(is_staff ?
                                      'processing'
                                     :
                                      'current')
  const {isTabsBig} = useUserAgent()

  return(
    <div>
      <div>
        <h1 className='page-header'>Заказы</h1>
        <Tabs
            className = 'mb-3'
            {...(!isTabsBig ? {style:{fontSize:'0.75em'}} : {})}
            activeKey={status}
            onSelect={k => setStatus(k)}
            justify
          >
            {!is_staff &&
              <Tab eventKey="current" title="Текущий"/>}
            <Tab eventKey="processing" title="В обработке"/>
            <Tab eventKey="transporting" title="В доставке"/>
            <Tab eventKey="closed" title="Завершённые"/>
            <Tab eventKey="dropped" title="Отменённые"/>
        </Tabs>
      </div>
        {status !== 'current' ?
          <OrderRepresentation status={status}/>
        :
          <CurrentOrderDetail/>}


    </div>
  )
}

export default Orders;

        // <Outlet context= {[status]}/>
// const is_staff = useSelector(state => state.auth.is_staff)
// const navigate = useNavigate();
// const location = useLocation();
// let status = location.pathname.match(/(?<=\/orders\/).+/)
//
// if (status) {
//   status = status[0]
// }
//
// return(
//   <div>
//     <div>
//       <h1 className='page-header'>Заказы</h1>
//       <Tabs
//           className = 'mb-3'
//           defaultActiveKey={status}
//           onSelect={k => navigate(`/orders/${k}`)}
//         >
//           <Tab eventKey="current" title="Текущий"/>
//           <Tab eventKey="processing" title="В обработке"/>
//           <Tab eventKey="transporting" title="В доставке"/>
//           <Tab eventKey="closed" title="Завершённые"/>
//           <Tab eventKey="dropped" title="Отменённые"/>
//       </Tabs>
//     </div>
//
//       <Outlet context= {[status]}/>
//
//   </div>
