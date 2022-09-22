import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {navLinks} from '../../navigation/navLinks';

const NavbarNav = ({navigate}) => {
  return(
    <>
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
    </>
  )
}

export default NavbarNav
