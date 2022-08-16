import actionsCreators from '../utils/reduxActions';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react'
import {bindActionCreators} from 'redux'


export const useAction = () => {
  const dispatch = useDispatch()

  const boundActionCreators = useMemo(() =>
    bindActionCreators(actionsCreators, dispatch)
  , [dispatch])


  return boundActionCreators
}
