import {useSelector} from 'react-redux';
import {useCallback} from 'react'
import {useAction} from '../hooks/useAction';
import {useAPI} from '../hooks/useAPI';
import {useDownloadInitial} from '../hooks/useDownloadInitial';
import UserService from '../API/UserService';
import {twoStatesFormSubmitAction} from '../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../utils/errors/handleErrors';
import ChangeForm from '../components/UI/forms/ChangeForm';
import {useTwoStatesForm} from '../hooks/useForm';


const User = () => {
  const userId = useSelector(state => state.auth.userId)
  const [form,
         setForm,
         errors,
         setErrors,
         setField,
         isLoading,
         setIsLoading] = useTwoStatesForm(['username',
                                           'first_name',
                                           'last_name',
                                           'third_name',
                                           'email'])
  const {changeFullname} = useAction()

  const getUser = useCallback(async () => {
    await UserService.getUser(
      userId,
      (response) => {
        let newForm = {...form}
        for (let field in response) {
          newForm[field].value = response[field]
          newForm[field].initialValue = response[field]
        }
        setForm(newForm)
      }
    )
  }, [userId, form])

  useDownloadInitial(getUser, userId, setIsLoading)

  const fetchChanges = useCallback(async (field) => {
    await UserService.patchUser(
      userId,
      {[field]: form[field].value},
      () => {
        setField(field, {state:'notActive', initialValue:form[field].value})
        if (['first_name', 'last_name', 'third_name'].indexOf(field) !== -1){
          changeFullname({'field':{[field]: form[field].value}})
        }
      })
  }, [userId, form])

  const handleErrors = (err, field) => {
    handleFormsErrors(err, setErrors, field)
  }

  const patchUser = useAPI(
    twoStatesFormSubmitAction(form, fetchChanges, setErrors, handleErrors)
  )

  return(
    <ChangeForm header='Страница редактирования пользователя'
                condition={userId}
                isLoading={isLoading}
                form={form}
                onSubmit={patchUser}
                setField={setField}
                errors={errors}/>
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
