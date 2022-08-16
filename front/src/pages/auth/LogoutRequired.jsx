import LogoutButton from '../../components/UI/buttons/LogoutButton';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import LoadingTransition from '../../components/UI/loading/LoadingTransition'
import {Outlet} from 'react-router-dom';

const LogoutRequired = () => {
  const {fullname} = useSelector(state => state.auth);
  const [makeTransit, setMakeTransit] = useState(false);

  useEffect(() => {
    setMakeTransit(true);
  }, [fullname])

  return(
    <LoadingTransition in={makeTransit}>
      <div>
        {fullname ?
          <div style={{display:'flex',
                       justifyContent:'center',
                       flexDirection:'column'}}>
            <h1 className='page-header'>Необходимо выйти!</h1>
              <div className='main-text'>
                Желаете войти или зарегистрироваться? Для начала выйдите.
              </div>
              <LogoutButton />
          </div>
        :
          <Outlet />
        }
      </div>
    </LoadingTransition>

  )
}

export default LogoutRequired;
