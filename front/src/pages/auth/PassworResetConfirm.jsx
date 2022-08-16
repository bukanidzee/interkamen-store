import {useNavigate} from 'react-router-dom';
import {useForm} from '../../hooks/useForm'
import {useParams} from 'react-router-dom';
import {useCallback} from 'react'
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../../utils/errors/handleErrors';
import RegularForm from '../../components/UI/forms/RegularForm';

const PasswordResetConfirm = () => {
  const navigate = useNavigate()
  const [form, errors, setErrors, setField] = useForm(['new_password1',
                                                       'new_password2'])
  const params = useParams()

  const fetch = useCallback(async () => {
    await UserService.confirmResetPassword(
      {...form,
       ...params},
      () => {
        navigate('/login')
      })
  }, [form, params])

  const handleErrors = (err) => {
    handleFormsErrors(err, setErrors, 'new_password2')
  }

  const confirmResetPassword = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <RegularForm header='Подтвердите сброс пароля.'
                 onSubmit={confirmResetPassword}
                 form={form}
                 setField={setField}
                 errors={errors}
                 submitName='Подтвердить'/>
  )
}

export default PasswordResetConfirm;
