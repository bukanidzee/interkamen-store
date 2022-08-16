import {validateRequired,
        validateTwoEqualFields,
        validateType} from './checkFunctions';

export const validateForm = (form) => {
  let newErrors = {}
  // console.log(form.image)
  for (let field in form) {
    if (field.search(/password1/) >= 0) {
      validateTwoEqualFields(form, newErrors, field, field.slice(0,-1)+2)
    } else if (field.search(/password2/) === -1) {
      validateRequired(form, newErrors, field)
    }
    validateType(form, newErrors, field)
  }
  return newErrors
}

export const validateFormField = (form, name) => {
  let newErrors ={}
  validateRequired(form, newErrors, name)
  validateType(form, newErrors, name)
  return newErrors
}
