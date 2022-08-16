import { useState, useEffect, useMemo, useCallback} from 'react';
import ModalPage from './ModalPage';
// import Button from 'react-bootstrap/Button'
import OneButtonOrGroup from '../buttons/OneButtonOrGroup';
import '../../../static/css/UI/modalconfirmationcontent.css';

const ModalConfirmationPage = ({action,
                                actionData,
                                visible,
                                setVisible,
                                setChoosedOrder}) => {

  const [classes, setClasses] = useState('')

  useEffect(() => {
    setClasses(visible ?
                'Modal active'
               :
                'Modal')
  }, [visible])

  const confirmAndClose = useCallback(async () => {
    await action(actionData);
    if (setChoosedOrder) {
      setChoosedOrder(-1)
    }
  }, [actionData, action])

  const buttons = useMemo(() => [
    {name:'Подтвердить',
     action: async () => await confirmAndClose()},
    {name:'Отменить',
     action: () => setVisible(false)},
  ], [confirmAndClose])

  return(
    <ModalPage classes={classes} setVisible={setVisible}>
      <div className='modalConfirmationContent' onClick={(e) => e.stopPropagation()}>
        <h2 className='page-header'>Вы уверены?</h2>
        <OneButtonOrGroup buttons={buttons} withMargin/>
      </div>
    </ModalPage>
  )
}

export default ModalConfirmationPage;
