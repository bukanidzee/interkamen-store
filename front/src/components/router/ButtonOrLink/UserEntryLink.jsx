import Nav from 'react-bootstrap/Nav';

const UserEntryLink = ({UserEntryComponent, navigate}) =>
  <Nav className='ml-auto'>
    <UserEntryComponent variant='dark'
                        onClick={() => navigate('/login')}>
      Войти
    </UserEntryComponent>
    <UserEntryComponent variant='dark'
                        onClick={() => navigate('/registration')}
                        className='ml-1'>
      Зарегистрироваться
    </UserEntryComponent>
  </Nav>

export default UserEntryLink
