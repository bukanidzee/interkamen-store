import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const PasswordChangeSuccess = () => {
  const navigate = useNavigate()
  return(
    <div className='d-flex flex-column'>
      <h1 className='page-header'>Успешно!</h1>
      <div className='main-text'>
        Пароль был успешно изменен!
      </div>
      <div className='d-flex justify-content-center'>
        <Button variant='primary'
                onClick={(() => navigate('/store'))}>
          Перейти к покупкам
        </Button>
      </div>
    </div>
  )
}

export default PasswordChangeSuccess;
