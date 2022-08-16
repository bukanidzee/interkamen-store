import Loader from '../loading/Loader';
import ModalPage from './ModalPage';
import {useSelector} from 'react-redux';
import {useMemo} from 'react'

const ModalLoader = () => {
  const {isLoading} = useSelector(state => state.loading)
  const rootClasses = useMemo(() => {
    const classArray = ['Modal']
    
    if (isLoading) {
      classArray.push('active')
    }
    return classArray
  }, [isLoading])

  return(
    <ModalPage classes={rootClasses.join(' ')}>
      <div style={{position: 'absolute',
                   top: '50%',
                   left: '50%'}}>
        <Loader />
      </div>
    </ModalPage>
  )
}

export default ModalLoader;
