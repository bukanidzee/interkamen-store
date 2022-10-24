import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../static/css/components/navbar.scss';
import BasketIcon from '../../static/images/basket.svg';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OrdersLink from './ButtonOrLink/OrdersLink';
import UserEntryLink from './ButtonOrLink/UserEntryLink';

import {useLogout} from '../../hooks/useLogout';
import {useSelector} from 'react-redux';

const NavbarUser = ({navigate, isNavbarExpanded}) => {
  const {is_staff, fullname} = useSelector(state => state.auth)
  const items = useSelector(state => state.currentOrder.items)

  const logoutClick = useLogout()
  return(
    <>
      {fullname ?
        <>
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
            <OrdersLink OrderComponent={isNavbarExpanded ? Button : Nav.Link}
                        body={isNavbarExpanded ?
                          <svg fill="dark" width={22} height={22}>
                            <BasketIcon />
                          </svg>
                          :
                          'Корзина' }
                        is_staff={is_staff}
                        items={items}
                        navigate={navigate}/>
          </Nav>
        </> :
        <>
        <UserEntryLink UserEntryComponent={isNavbarExpanded ? Button : Nav.Link}
                       navigate={navigate}/>
        </>
      }
    </>
  )
}

export default NavbarUser



// <>
//   <Nav.Link variant='dark'
//           onClick={() => navigate('/login')}>
//     Войти
//   </Nav.Link>
//   <Nav.Link variant='dark'
//           onClick={() => navigate('/registration')}>
//     Зарегистрироваться
//   </Nav.Link>
// </>

// <>
//   <Button variant='dark'
//           onClick={() => navigate('/login')}>
//     Войти
//   </Button>
//   <Button variant='dark'
//           onClick={() => navigate('/registration')}>
//     Зарегистрироваться
//   </Button>
// </>
