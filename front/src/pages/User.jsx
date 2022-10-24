import {useSelector} from 'react-redux';
import {useAction} from '../hooks/useAction';
import {useAPI} from '../hooks/useAPI';
import {useDownloadInitial} from '../hooks/useDownloadInitial';
import UserService from '../API/UserService';
import {regularFormSubmitAction} from '../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../utils/errors/handleErrors';
import ChangeForm from '../components/UI/forms/ChangeForm';
import {useTwoStatesForm} from '../hooks/useForm';
import CentrifyForm from '../components/UI/forms/CentrifyForm';
import {createFormData} from '../utils/forms/createFormData'
import {readableNameAndInitials} from '../utils/readable/readableNameAndInitials'


const User = () => {
  const userId = useSelector(state => state.auth.userId)
  const [form,
         setEntireForm,
         errors,
         setErrors,
         setField,
         isLoading,
         setIsLoading] = useTwoStatesForm(['username',
                                           'first_name',
                                           'last_name',
                                           'third_name',
                                           'email'])
  const {setFullname} = useAction()

  const getUser = async () => {
    await UserService.getUser(
      userId,
      setEntireForm
    )
  }

  useDownloadInitial(getUser, userId, setIsLoading)

  const fetchChanges = async () => {
    const formdata = createFormData(form, {})
    await UserService.patchUser(
      userId,
      formdata,
      (data) => {
        setEntireForm(data)
        setFullname(readableNameAndInitials(form))
      })
  }

  const handleErrors = (err, field) => {
    handleFormsErrors(err, setErrors, field)
  }

  const patchUser = useAPI(
    regularFormSubmitAction(form, fetchChanges, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <ChangeForm header='Страница редактирования пользователя'
                  condition={userId}
                  isLoading={isLoading}
                  form={form}
                  onSubmit={patchUser}
                  setField={setField}
                  errors={errors}/>
    </CentrifyForm>
  )
}

export default User

// <h1 className='page-header'>Страница редактирования пользователя</h1>
// {userId &&
//   <LoadingThenContent isLoading={isLoading}>
//     {Object.keys(form).map((name) =>
//         <TwoStatesFormItem onSubmit={patchUser}
//                            label={formsFields[name].label}
//                            placeholder={formsFields[name].placeholder}
//                            type={formsFields[name].type}
//                            field={form[name]}
//                            name={name}
//                            setField={setField}
//                            error={errors[name]}
//                            key={name}
//                            />)}
//   </LoadingThenContent>
// }
