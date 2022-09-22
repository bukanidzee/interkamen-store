import {useNavigate} from 'react-router-dom';
import '../../static/css/components/navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarNav from './NavbarNav';
import NavbarUser from './NavbarUser';
import LogoImg from '../../static/images/logo_name.png';
import {useMediaQuery} from 'react-responsive';
import classnames from 'classnames';

const NavbarComponent = () => {
    const navigate = useNavigate();
    const isStretched = useMediaQuery({ maxWidth: 1200})

    return(
      <Navbar className={classnames('navbar',
                                    {'fixed-position': isStretched})}
              collapseOnSelect
              expand="xl">
        <Container fluid>
          <Navbar.Brand href='/'>
            <img className='head-img'
                 src={LogoImg}
                 alt='logo'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-collapse" />
          <Navbar.Collapse id="nav-collapse"
                           className='justify-content-between'>
            <NavbarNav navigate={navigate}/>
            <NavbarUser navigate={navigate}
                        isStretched={isStretched}/>
          </Navbar.Collapse>
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
