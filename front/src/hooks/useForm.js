import {useState} from 'react'
import {makeEmptyObject,
        makeEmptyTwoStatesObject} from '../utils/forms/makeEmptyObject';

export const useForm = (fields) => {
  const [form, setForm] = useState(makeEmptyObject(fields))
  const [errors, setErrors] = useState({})
  const setField = (field, data) => {
    setForm({
      ...form,
      [field]: data.value
    })
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  return [form, errors, setErrors, setField]
}

export const useTwoStatesForm = (fields) => {
  const [form, setForm] = useState(makeEmptyTwoStatesObject(fields))
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const setField = (field, data) => {
    let newForm = {...form}
    // for (let f in newForm){
    //   if (f != field && newForm[f].state === 'active'){
    //     newForm[f].state = 'notActive'
    //     break
    //   }
    // }
    newForm[field]={...newForm[field], ...data}
    setForm(newForm)
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const setEntireForm = (data) => {
    let newForm = {...form}
    for (let field of fields) {
      newForm[field].value = data[field]
      newForm[field].initialValue = data[field]
    }
    setForm(newForm)
  }

  return [form, setEntireForm, errors, setErrors, setField, isLoading, setIsLoading]
}
