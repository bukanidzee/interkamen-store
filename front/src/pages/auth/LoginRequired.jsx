import Login from './Login';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import LoadingTransition from '../../components/UI/loading/LoadingTransition'
import {Outlet} from 'react-router-dom';

const LoginRequired = () => {
  const {fullname} = useSelector(state => state.auth);
  const [makeTransit, setMakeTransit] = useState(false);

  useEffect(() => {
    setMakeTransit(true);
  }, [fullname])

  return(
    <LoadingTransition in={makeTransit}>
      <div>
        {!fullname ?
          <div>
            <div>Авторизируйтесь для предпринимаемых действий</div>
            <Login isRedirectCase={false}/>
          </div>
        :
          <Outlet />
        }
      </div>
    </LoadingTransition>
  )
}

export default LoginRequired;
