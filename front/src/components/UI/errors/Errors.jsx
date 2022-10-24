import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import {useAction} from '../../../hooks/useAction'
import '../../../static/css/UI/errors.scss';

const Errors = () => {
  const errors = useSelector(state => state.errors)
  const [errorArray, setErrorArray] = useState([])
  const {deleteError} = useAction()

  useEffect(() => {
    if (errors) {
      setErrorArray(errors)
    }
  }, [errors])

  return(
    <div className='errorBack'>
      <ToastContainer position='bottom-start' className='p-3'>
        {errorArray.map((error, index) =>
          <Toast key={index}
                 bg='danger'
                 onClose={() => deleteError(index)}
                 show={true}
                 delay={5000}
                 autohide
                 style={{pointerEvents: 'auto'}}>
            <Toast.Header>
              <strong className="me-auto">Произошла ошибка!</strong>
            </Toast.Header>
            <Toast.Body>
              {error}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </div>
  )
}

export default Errors
