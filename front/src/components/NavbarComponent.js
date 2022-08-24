import React from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import '../static/css/components/navbar.css';
import BasketIcon from '../static/images/basket.svg';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoImg from '../static/images/logo_name.png';
import {navLinks} from '../navigation/navLinks';
import {useLogout} from '../hooks/useLogout';
import {useIsStaffAndFullname} from '../hooks/useAuthData';
import {useSelector} from 'react-redux';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [is_staff, fullname] = useIsStaffAndFullname();
    const {items} = useSelector(state => state.currentOrder)
    const logoutClick = useLogout()

    return(
      <Navbar className='navbar' expand='lg'>
        <Container fluid>
          <div className='navbar-set'>
            <Navbar.Brand href='/'>
              <img className='head-img'
                   src={LogoImg}
                   alt='logo'/>
            </Navbar.Brand>
            <Nav variant='pills' className='navbar-set'>
              {navLinks.map((bar) =>
                  <NavDropdown title={bar.title}
                               key={bar.title}>
                    {bar.links.map((link) =>
                      <NavDropdown.Item
                        key={link.name}
                        onClick={(() => navigate(link.to))}>
                        {link.name}
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
              )}
            </Nav>
          </div>
          {fullname ?
            <div className='navbar-set'>
              <Nav variant='pills' className='navbar-set'>
                <NavDropdown title={fullname}>
                  <NavDropdown.Item onClick={() => navigate('/user')}>
                    Редактировать
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('/password/change')}>
                    Смена пароля
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logoutClick()}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Button
                variant='dark'
                onClick={() => navigate('/orders')}>
                  <svg fill="currentColor" width={22} height={22}>
                    <BasketIcon />
                  </svg>
                  {!is_staff && items.length}
              </Button>
            </div> :
            <div className='navbar-set'>
              <Button variant='dark'
                      onClick={() => navigate('/login')}>
                Войти
              </Button>
              <Button variant='dark'
                      onClick={() => navigate('/registration')}>
                Зарегистрироваться
              </Button>
            </div>
          }
        </Container>
      </Navbar>
    )
}

export default NavbarComponent;

// const Navbar = () => {
//     const navigate = useNavigate();
//     const {username} = useSelector(state => state.auth);
//     const {items} = useSelector(state => state.currentOrder)
//     const logoutClick = useLogout()
//
//     return(
//       <div className='navbar'>
//         <div className='bar-image-and-buttons'>
//           <Link to=''>
//             <img className='head-img'
//                  src={require('../static/images/logo_name.png')}
//                  alt='logo'/>
//           </Link>
//           <Nav className='navbar-set' variant='pills'>
//             {navLinks.map((bar) => {
//               return(
//                 <NavDropdown title={bar.title}
//                              key={bar.title}>
//                   {bar.links.map((link) =>
//                     <NavDropdown.Item
//                       key={link.name}
//                       onClick={(() => navigate(link.to))}>
//                       {link.name}
//                     </NavDropdown.Item>
//                   )}
//                 </NavDropdown>
//               )
//             })}
//           </Nav>
//         </div>
//         {username ?
//           <div className='navbar-set'>
//             <Nav variant='pills'>
//               <NavDropdown title={username}>
//                 <NavDropdown.Item onClick={() => navigate('/user')}>
//                   Редактировать
//                 </NavDropdown.Item>
//                 <NavDropdown.Item onClick={() => navigate('/password/change')}>
//                   Смена пароля
//                 </NavDropdown.Item>
//                 <NavDropdown.Item onClick={() => logoutClick()}>
//                   Выйти
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//             <Button
//               variant='primary'
//               onClick={() => navigate('/orders/current')}>
//                 <svg fill="currentColor" width={22} height={22}>
//                   <BasketIcon />
//                 </svg>
//                 ({items.length})
//             </Button>
//           </div> :
//           <div className='navbar-set'>
//             <Button variant='primary'
//                     onClick={() => navigate('/login')}>
//               Войти
//             </Button>
//             <Button variant='primary'
//                     onClick={() => navigate('/registration')}>
//               Зарегистрироваться
//             </Button>
//           </div>
//         }
//       </div>
//     )
// }
//
// export default Navbar;
