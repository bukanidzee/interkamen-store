import Button from 'react-bootstrap/Button';
import {useLogout} from '../../../hooks/useLogout';

const LogoutButton = () => {
  const logoutClick = useLogout()

  return(
    <Button
      variant='primary'
      className='mx-auto'
      onClick={logoutClick}>
        Выйти
    </Button>
  )
}

export default LogoutButton;
