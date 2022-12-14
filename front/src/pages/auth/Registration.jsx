import {useForm} from '../../hooks/useForm';

import RegularForm from '../../components/UI/forms/RegularForm';
import CentrifyForm from '../../components/UI/forms/CentrifyForm';
import UserService from '../../API/UserService';
import {useAPI} from '../../hooks/useAPI';
import {useAction} from '../../hooks/useAction'
import {regularFormSubmitAction} from '../../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../../utils/errors/handleErrors'
import {addAuthData, getCurrentOrder} from '../../utils/authData';

const Registration = () => {
  const {login, setOrder} = useAction()
  const [form, errors, setErrors, setField] = useForm(['username',
                                                       'password1',
                                                       'password2',
                                                       'first_name',
                                                       'last_name',
                                                       'third_name',
                                                       'email'])
  const fetch = async () => {
    await UserService.registration(
      form,
      async (response) => {
        addAuthData(response, login)
        await getCurrentOrder(response.is_staff,
                              setOrder)
      })
  }

  const handleErrors = (err) => {
    handleFormsErrors(err, setErrors, 'password2')
  }

  const getUserKey = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <RegularForm header='Регистрация'
                   onSubmit={getUserKey}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Зарегистрироваться'/>
    </CentrifyForm>
  )
}

export default Registration;
