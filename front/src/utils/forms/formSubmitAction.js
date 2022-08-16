import {validateForm,
        validateFormField} from '../validate/validate';

export const regularFormSubmitAction = (form, fetch, setErrors, handleErrors) => {
  return async (event) => {
    event.preventDefault()
    const newErrors = validateForm(form)
    await setErrorsOrFetch(setErrors, newErrors, fetch, handleErrors)
  }
}

export const twoStatesFormSubmitAction = (form, fetch, setErrors, handleErrors) => {
  return async (event) => {
    event.preventDefault()
    const field = event.target.id.slice(5)
    const newErrors = validateFormField(form, field)
    await setErrorsOrFetch(setErrors, newErrors, fetch, handleErrors, field)
  }
}

const setErrorsOrFetch = async (setErrors, newErrors, fetch, handleErrors, field) => {
  if ( Object.keys(newErrors).length > 0 ) {
    setErrors(newErrors)
  } else {
    try {
      await fetch(field)
    } catch (err) {
      handleErrors(err, field)
    }
  }
}
// export const twoStatesFormAction =
