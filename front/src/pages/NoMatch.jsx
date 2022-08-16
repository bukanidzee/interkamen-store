import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const NoMatch = () => {
  const navigate = useNavigate()
  return(
    <>
      <h1 className='page-header'>Уууууупс, вас занесло куда-то не туда</h1>
      <div className='d-flex justify-content-center'>
        <Button variant='secondary'
                onClick={() => navigate('/')}>
          Вернуться на начальную страницу
        </Button>
      </div>
    </>
  )
}

export default NoMatch;
