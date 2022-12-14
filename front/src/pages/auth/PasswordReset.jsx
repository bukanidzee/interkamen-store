import {useNavigate} from 'react-router-dom';
import {useForm} from '../../hooks/useForm';
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import RegularForm from '../../components/UI/forms/RegularForm';
import CentrifyForm from '../../components/UI/forms/CentrifyForm';


const PasswordReset = () => {
  const navigate = useNavigate()
  const [form, errors, setErrors, setField] = useForm(['email'])
  const fetch = async () => {
    await UserService.resetPassword(
      form,
      async () => {
        navigate('/password/reset/success')
      })
  }

  const handleErrors = (err) => {
    setErrors({...errors, email:err.response.data.detail})
  }

  const resetPassword = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <RegularForm header='Сброс пароля.'
                   onSubmit={resetPassword}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Сбросить пароль'/>
    </CentrifyForm>
  )
}

export default PasswordReset;
