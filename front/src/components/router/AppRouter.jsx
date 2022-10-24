import {useRoutes, useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingGroupTransition from '../UI/loading/LoadingGroupTransition';
import {useEffect} from 'react'

import '../../static/css/appcontent.scss';
import { routes } from '../../navigation/routes';

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const  {is_staff, fullname} = useSelector(state => state.auth)

  const routing = useRoutes(routes(fullname, is_staff, location.pathname), location);

  useEffect(() => {
    if (location.state && fullname){
      navigate(location.state)
    }
  }, [location.state, fullname])

  return(
    <LoadingGroupTransition transitionKey={location.key}>
        {routing}
    </LoadingGroupTransition>
  )
}

export default AppRouter;
