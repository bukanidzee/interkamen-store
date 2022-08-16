import { useSelector } from 'react-redux';


import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const { fullname } = useSelector(state => state.auth);
  const location = useLocation();

  if (!fullname) {
    return <Navigate to='/login' state={{from: location}} replace />
  }

  return <Outlet />;

  // return (
  //   <div>
  //     {username?.payload ?
  //       props.children :
  //       <Navigate to='/login' state={{from: location}} replace />
  //     }
  //   </div>
  // )
}

export default RequireAuth;

// const RequireAuth = ({...props}) => {
//   const username = useSelector((state) => state.auth.username);
//   const location = useLocation();
//   const navigate = useNavigate();
//
//
//   if (username) {
//     return (
//       <div>
//           {props.children}
//       </div>
//     )
//   } else {
//     navigate('/login', { replace: true, state:{from:location}});
//   }
//
//
// }
//
// export default RequireAuth;
