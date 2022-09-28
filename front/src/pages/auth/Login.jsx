import { addAuthData, getCurrentOrder } from '../../utils/authData';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {useAction} from '../../hooks/useAction'
import RegularForm from '../../components/UI/forms/RegularForm';
import CentrifyForm from '../../components/UI/forms/CentrifyForm';
import {Link} from 'react-router-dom';
import {useCallback} from 'react'

import {useForm} from '../../hooks/useForm'


const Login = () => {
  const {login, setOrder} = useAction()
  const [form, errors, setErrors, setField] = useForm(['username',
                                                       'password'])


  const fetch = useCallback(async () => {
    await UserService.login(
      form,
      async (response) => {
        addAuthData(response, login)
        await getCurrentOrder(response.is_staff,
                              setOrder)
      })
  }, [form])

  const handleErrors = () => {
    setErrors({...errors, username:'Неверные логин или пароль'})
  }

  const getUserKey = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <RegularForm header='Войти'
                   onSubmit={getUserKey}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Войти'/>
      <div className='d-flex justify-content-center w-100'>
        <Link to='/password/reset'>
          Забыли пароль?
        </Link>
        &nbsp;|&nbsp;
        <Link to='/registration'>
          Зарегистрироваться
        </Link>
      </div>
  </CentrifyForm>
  )
}

export default Login;

// <Form.Group className='mb-3'>
//   <Form.Label>Логин:</Form.Label>
//   <Form.Control type="text"
//                 name="username"
//                 placeholder="Введите логин"/>
// </Form.Group>
// <Form.Group className='mb-3'>
//   <Form.Label>Пароль:</Form.Label>
//   <Form.Control type="password"
//                 name="password"
//                 placeholder="Введите пароль"/>
// </Form.Group>

// <h1 className='page-header'>Или зарегистрируйтесь</h1>
// <Button variant='secondary'
//         onClick={() => navigate('/registration')}
//         style={{marginLeft: 'auto',
//                 marginRight: 'auto',
//                 display:'block'}}>
//   Зарегистрироваться
// </Button>
