import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate()
  return(
    <>
      <h1 className='page-header'>Извините, доступ открыт только для сотрудников!</h1>
      <div className='d-flex justify-content-center'>
        <Button variant='secondary'
                onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      </div>
    </>
  )
}

export default AccessDenied;
