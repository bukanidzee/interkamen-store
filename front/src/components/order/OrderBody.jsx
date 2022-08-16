import { useState } from 'react';
import OneButtonOrGroup from '../UI/buttons/OneButtonOrGroup';
import ModalConfirmationPage from '../UI/modal/ModalConfirmationPage';
import ProductItemsList from '../product/ProductItemsList';
import { get_readable_date } from '../../utils/readable/readable_date';
import {useOrdersButtons} from '../../hooks/useOrdersButtons';

const OrderBody = ({buttonAction,
                    status,
                    setChoosedOrder,
                    orderDetails}) => {

  const [modal, setModal] = useState(false);
  const [actionData, setActionData] = useState({})

  const buttons = useOrdersButtons(status, setModal, setActionData)

  return(
    <div style={{marginTop:20}}>
      <ModalConfirmationPage action={buttonAction}
                             actionData={actionData}
                             visible={modal}
                             setVisible={setModal}
                             setChoosedOrder={setChoosedOrder}/>

      {orderDetails.items?.length ?
          <>
            <div className='mb-4 pt-4 d-flex justify-content-between'>
              {orderDetails?.created &&
                <div>
                  Заказ от {get_readable_date(new Date(orderDetails.created))}
                </div>}
              {orderDetails?.finished &&
                <div>
                  Завершён: {get_readable_date(new Date(orderDetails.finished))}
                </div>}
            </div>
            {orderDetails?.total_prize &&
              <div style={{marginBottom: 20}}>
                Общая сумма: {orderDetails.total_prize} руб.
              </div>}
            <ProductItemsList items={orderDetails.items}
                              place={orderDetails.status}/>
            <OneButtonOrGroup buttons={buttons}
                              withMargin/>
          </>
        :
          <h1 className='h1-center'>В заказе нет продуктов</h1>
      }
    </div>
  )
}

export default OrderBody;

// import Loader from './UI/loading/Loader';
// {isLoading &&
//   <div style={{
//               display:'flex',
//               justifyContent:'center',
//               marginTop: 50}}>
//     <Loader />
//   </div>
// }

// style={{display:'flex',
//              justifyContent:'space-between',
//              marginBottom: 20,
//              paddingTop: 20}}

// <div style={{display:'flex',
//             justifyContent:'flex-end',
//             marginTop: 20}}>
//   <ActionButton action={() => setModal(true)}
//                 buttonName={buttonAction.name}/>
// </div>
