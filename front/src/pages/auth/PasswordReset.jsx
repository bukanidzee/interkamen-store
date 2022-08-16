import {useNavigate} from 'react-router-dom';
import {useCallback} from 'react'
import {useForm} from '../../hooks/useForm';
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import RegularForm from '../../components/UI/forms/RegularForm';


const PasswordReset = () => {
  const navigate = useNavigate()
  const [form, errors, setErrors, setField] = useForm(['email'])
  const fetch = useCallback(async () => {
    await UserService.resetPassword(
      form,
      async () => {
        navigate('/password/reset/success')
      })
  }, [form])

  const handleErrors = (err) => {
    setErrors({...errors, email:err.response.data.detail})
  }

  const resetPassword = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <RegularForm header='Сброс пароля.'
                 onSubmit={resetPassword}
                 form={form}
                 setField={setField}
                 errors={errors}
                 submitName='Сбросить пароль'/>
  )
}

export default PasswordReset;
