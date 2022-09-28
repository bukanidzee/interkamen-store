import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react'
import {useAPI} from '../../hooks/useAPI';
import UserService from '../../API/UserService';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../../utils/errors/handleErrors';
import {useForm} from '../../hooks/useForm';
import RegularForm from '../../components/UI/forms/RegularForm';
import CentrifyForm from '../../components/UI/forms/CentrifyForm';

const PasswordChange = () => {
  const [form, errors, setErrors, setField] = useForm(['old_password',
                                                       'new_password1',
                                                       'new_password2'])
  const navigate = useNavigate()

  const fetch = useCallback(async () => {
    await UserService.changePassword(
      form,
      () => {
        navigate('/password/change/success')
      })
  }, [form])

  const handleErrors = (err) => {
    handleFormsErrors(err, setErrors, 'new_password2')
  }

  const changePassword = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return (
    <CentrifyForm>
      <RegularForm header='Смена пароля'
                   onSubmit={changePassword}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Сменить пароль'/>
    </CentrifyForm>
  )
}

export default PasswordChange

// <>
//   <h1 className='page-header'>Смена пароля</h1>
//   <Form onSubmit={changePassword} className='d-flex flex-column w-50 mx-auto'>
//     <FormItem label='Старый пароль:'
//               type='password'
//               placeholder='Введите старый пароль'
//               name='old_password'
//               setField={setField}
//               error={errors?.old_password}/>
//     <FormItem label='Новый пароль:'
//               type='password'
//               placeholder='Введите новый пароль'
//               name='new_password1'
//               setField={setField}
//               error={errors?.new_password1}/>
//     <FormItem label='Повторите новый пароль:'
//               type='password'
//               placeholder='Повторите новый пароль'
//               name='new_password2'
//               setField={setField}
//               error={errors?.new_password2}/>
//     <Button type='submit'
//             variant='secondary'
//             style={{marginLeft: 'auto',
//                     marginRight: 'auto'}}>
//       Сменить пароль
//     </Button>
//   </Form>
// </>
