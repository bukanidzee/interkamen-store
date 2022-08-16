import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RegistrationSuccess = () => {
  const {fullname} = useSelector(state => state.auth)
  const navigate = useNavigate()
  return(
    <div className='d-flex flex-column'>
      <h1 className='page-header'>Успешно!</h1>
      {fullname &&
        <div className='main-text'>
          Спасибо, что присоединились {fullname}! Чтобы получать уведомления, пожалуйста активируйте свою электронную почту, перейдя по ссылке в письме, которое уже должно прийти к Вам.
        </div>
      }
      <div className='d-flex justify-content-center'>
        <Button variant='primary'
                onClick={(() => navigate('/store'))}>
          Перейти к покупкам
        </Button>
      </div>
    </div>
  )
}

export default RegistrationSuccess;
