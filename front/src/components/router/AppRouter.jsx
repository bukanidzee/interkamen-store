import {useRoutes, useLocation} from 'react-router-dom';
import { useIsStaffAndFullname } from '../../hooks/useAuthData';
import LoadingGroupTransition from '../UI/loading/LoadingGroupTransition';


import '../../static/css/appcontent.scss';
import { routes } from '../../navigation/routes';

const AppRouter = () => {
  const location = useLocation();
  const  [is_staff, fullname] = useIsStaffAndFullname()

  const routing = useRoutes(routes(fullname, is_staff, location.pathname), location);


  return(
    <LoadingGroupTransition transitionKey={location.key}>
        {routing}
    </LoadingGroupTransition>
  )
}

export default AppRouter;
