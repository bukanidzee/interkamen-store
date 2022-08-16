import { Outlet} from 'react-router-dom';

import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Career from '../pages/Career';
import RockProperties from '../pages/Rock_Properties';
import Store from '../pages/Store';
import ProductDetail from '../pages/ProductDetail';
import NoMatch from '../pages/NoMatch';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import RegistrationSuccess from '../pages/auth/RegistrationSuccess';
import Orders from '../pages/Orders';
import User from '../pages/User';
import Navigation from '../components/router/Navigation';
import EmailConfirmation from '../pages/auth/EmailConfirmation';
import PasswordChange from '../pages/auth/PasswordChange';
import PasswordChangeSuccess from '../pages/auth/PasswordChangeSuccess';
import PasswordReset from '../pages/auth/PasswordReset';
import PasswordResetSuccess from '../pages/auth/PasswordResetSuccess';
import PasswordResetConfirm from '../pages/auth/PassworResetConfirm';
import AccessDenied from '../pages/AccessDenied';
import ProductCreate from '../pages/ProductCreate';
import ProductChange from '../pages/ProductChange';
import CustomNavigate from '../components/router/CustomNavigate'

export const routes = (fullname, is_staff, pathname) =>
  [{
    path: '/',
    element: <Navigation />,
    children: [
      { index: true, element: <Home />},
      { path:'contacts', element: <Contacts />},
      { path:'career', element: <Career />},
      { path:'rock_properties', element: <RockProperties />},
      { path:'*', element: <NoMatch />},
      {
        element: fullname ? <Outlet /> : <CustomNavigate to='/login'
                                                         replace={true}
                                                         state={pathname}/>,
        children: [
          {path: 'store', element: <Store />},
          {path: 'store/:productId', element: <ProductDetail />},
          {path: 'registration/success', element: <RegistrationSuccess />},
          {path: 'email/:key', element: <EmailConfirmation />},
          {path: 'password/change', element: <PasswordChange />},
          {path: 'password/change/success', element: <PasswordChangeSuccess />},
          {path: 'user', element: <User />},
          {path: 'orders', element: <Orders />},
           {element: is_staff ? <Outlet /> : <AccessDenied />,
            children:[
              {path: 'store/create', element: <ProductCreate />},
              {path: 'store/:productId/change', element: <ProductChange />},
            ]
          }
        ]
      },
      {
        element: !fullname ? <Outlet /> : <CustomNavigate to='/' replace={true} />,
        children: [
          {path: 'login', element: <Login isRedirectCase={true}/>},
          {path: 'registration', element: <Registration />},
          {path: 'password/reset', element: <PasswordReset />},
          {path: 'password/reset/success', element: <PasswordResetSuccess />},
          {path: 'password/reset/confirm/:uid/:token', element: <PasswordResetConfirm />},
        ]
      },
    ]
  }]

// {path: 'orders',
//  element: <Orders />,
//  children:[
//    {path: 'current',
//     element: <CurrentOrderDetail />},
//    {path: 'processing',
//     element: <OrderRepresentation />},
//    {path: 'transporting',
//     element: <OrderRepresentation />},
//    {path: 'closed',
//     element: <OrderRepresentation />},
//    {path: 'dropped',
//     element: <OrderRepresentation />},
//  ]},

// <Routes location = {location}>
//   <Route path='/' element={<Navigation />}>
//     <Route index element={<Home />}/>
//     <Route path='contacts' element={<Contacts />}/>
//     <Route path='career' element={<Career />}/>
//     <Route path='rock_properties' element={<RockProperties />} />
//     <Route element={<RequireAuthElement />}>
//       <Route path='store' element={<Store/>} />
//       <Route path='store/:productId' element={<ProductDetail/>} />
//       <Route path='orders' element={<Orders/>} />
//     </Route>
//     <Route path='login' element={<Login />} />
//     <Route path='registration' element={<Registration />} />
//     <Route path='oops' element={<ErrorMessage />} />
//     <Route path='*' element={<NoMatch />}/>
//   </Route>
// </Routes>
