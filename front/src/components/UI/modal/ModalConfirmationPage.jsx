import ModalPage from './ModalPage';
import ModuleOuterComponent from './ModuleOuterComponent'
// import Button from 'react-bootstrap/Button'
import OneButtonOrGroup from '../buttons/OneButtonOrGroup';
import '../../../static/css/UI/modalconfirmationcontent.scss';
import cn from 'classnames'

const ModalConfirmationPage = ({action,
                                actionData,
                                visible,
                                setVisible,
                                setChoosedOrder}) => {

  const confirmAndClose = async () => {
    await action(actionData);
    if (setChoosedOrder) {
      setChoosedOrder(-1)
    }
  }

  const buttons = [
    {name:'Подтвердить',
     action: async () => await confirmAndClose()},
    {name:'Отменить',
     action: () => setVisible(false)},
  ]

  return(
    <ModuleOuterComponent>
      <ModalPage classes={cn('Modal', {'active': visible})} setVisible={setVisible}>
        <div className='modalConfirmationContent' onClick={(e) => e.stopPropagation()}>
          <h2 className='page-header'>Вы уверены?</h2>
          <OneButtonOrGroup buttons={buttons} withMargin/>
        </div>
      </ModalPage>
    </ModuleOuterComponent>
  )
}

export default ModalConfirmationPage;
