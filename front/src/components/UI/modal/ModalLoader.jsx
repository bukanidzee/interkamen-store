import LoaderSpinner from '../loading/LoaderSpinner';
import ModalPage from './ModalPage';
import {useSelector} from 'react-redux';
import cn from 'classnames'

const ModalLoader = () => {
  const {isLoading} = useSelector(state => state.loading)

  return(
    <ModalPage classes={cn('Modal', {'active': isLoading})}>
      <div style={{position: 'absolute',
                   top: '50%',
                   left: '50%'}}>
        <LoaderSpinner />
      </div>
    </ModalPage>
  )
}

export default ModalLoader;
