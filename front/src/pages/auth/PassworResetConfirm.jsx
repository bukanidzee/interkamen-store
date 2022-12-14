import {useNavigate} from 'react-router-dom';
import {useForm} from '../../hooks/useForm'
import {useParams} from 'react-router-dom';
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../../utils/errors/handleErrors';
import RegularForm from '../../components/UI/forms/RegularForm';
import CentrifyForm from '../../components/UI/forms/CentrifyForm';

const PasswordResetConfirm = () => {
  const navigate = useNavigate()
  const [form, errors, setErrors, setField] = useForm(['new_password1',
                                                       'new_password2'])
  const params = useParams()

  const fetch = async () => {
    await UserService.confirmResetPassword(
      {...form,
       ...params},
      () => {
        navigate('/login')
      })
  }

  const handleErrors = (err) => {
    handleFormsErrors(err, setErrors, 'new_password2')
  }

  const confirmResetPassword = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <RegularForm header='Подтвердите сброс пароля.'
                   onSubmit={confirmResetPassword}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Подтвердить'/>
    </CentrifyForm>
  )
}

export default PasswordResetConfirm;
