// import {innerProperties} from './innerProperties'
import {deleteAuthData} from '../authData';
import {formErrors} from './formErrors';

export function handleFetchErrors (err, appendError, setOrder, logout) {

  if (err?.response) {
    if (err.response.status >= 500) {
      appendError(`Произошла ошибка ${err.response.status}, произошла внутренняя ошибка сервера!`)
    } else if (err.response.status === 400){
      appendError(`Произошла ошибка ${err.response.status}, ошибка в запросе к серверу!`)
    } else if (err.response.status === 401) {
      appendError(`Произошла ошибка ${err.response.status}, вы не авторизованы!`)
    } else if (err.response.status === 403) {
      if (err.response.data.detail === 'Invalid token.' ||
          err.response.data.detail === 'Недопустимый токен.') {
        deleteAuthData(setOrder, logout)
        appendError(`Произошла ошибка ${err.response.status}, пожалуйста авторизуйтесь повторно!`)
      } else {
        appendError(`Произошла ошибка ${err.response.status}, доступ запрещён!`)
      }
    } else if (err.response.status === 404) {
      appendError(`Произошла ошибка ${err.response.status}, страница не найдена!`)
    } else if (err.response.status > 404) {
      appendError(`Произошла ошибка ${err.response.status}, редкая ошибка запроса!`)
    }
  }
  else if (err?.request) {
    appendError('Не удалось получить ответ от сервера, проверьте соединение!')
  }
  else {
    console.log(err)
    appendError(`Упс что-то сломалось, мы работаем над этим! Ошибка: ${err}`)
  }
}

function addError(newErrors, key, error) {
  const newError = error in formErrors ? formErrors[error] : error
  newErrors[key] = newErrors[key] ? newErrors[key] + `\n${newError}` : newError
}

export function handleFormsErrors (err, setErrors, non_field) {
  const newErrors = {}
  if (err?.response?.status !== 400) {
    throw err
  }
  for (let key in err?.response?.data) {
    for (let error of err.response.data[key]) {
      addError(newErrors, key, error)
    }
  }
  newErrors.non_field_errors =  newErrors.non_field_errors || ''
  newErrors[non_field] = newErrors[non_field] ?
                          newErrors[non_field] + '\n' + newErrors.non_field_errors
                         :
                          newErrors.non_field_errors
  setErrors(newErrors);
}
