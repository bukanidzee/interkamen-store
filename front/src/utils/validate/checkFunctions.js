import {names} from '../forms/formFieldsNames';
import {formats} from './supportedImageFormats';
import {formsFields} from '../forms/formsFields';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateImageFormat = (imageName) => {
  for (let format of formats) {
    if (imageName.endsWith(format)) {
      return true
    }
  }
  return false
}

const getValue = () => {
  let funcs = {}
  funcs.validateRequired = (form, errors, field) => {
    if ((!form[field] || form[field] === '') && (formsFields[field].required)) {
      errors[field] = `Пожалуйста введите ${names[field]}`
    }
  }

  funcs.validateType = (form, errors, field) => {
    if (formsFields[field].as === 'textarea' &&
        form[field].search(/[^а-яА-Я.,0-9!?\s]/) !== -1){
      errors[field] = errors[field] || `Извините но допустимы лишь буквы кириллицы, цифры и знаки препинания`
    } else if (field in ['first_name', 'last_name', 'third_name', 'title'] &&
               form[field].search(/[^а-яА-Я.,0-9\s]/) !== -1){
      errors[field] = errors[field] || `Извините но допустимы лишь буквы кириллицы, цифры и знаки препинания`
    } else if (field === 'email' && !validateEmail(form[field])) {
      errors[field] = errors[field] || 'Извините email адрес введен неправильно, повторите ввод'
    } else if (formsFields[field].type in ['text', 'password'] &&
               form[field].search(/[^a-zA-Z.,0-9!?+*/\s-]/) !== -1){
      errors[field] = errors[field] || `Извините но допустимы лишь буквы латиницы, цифры и .,!?+-*/`
    } else if (formsFields[field].type === 'number' &&
               form[field].search(/[^0-9.,]/) !== -1){
      errors[field] = errors[field] || `Извините но необходимо ввести число`
    } else if (field === 'image' &&
               !validateImageFormat(form[field])) {
      errors[field] = errors[field] || `Извините но допустимы лишь форматы ${formats.join(', ')}`
    }
  }

  funcs.validateTwoEqualFields = (form, errors, field1, field2) => {
    if (!form[field1]|| form[field1] === '') {
      errors[field1] = `Пожалуйста введите ${names[field1]}`
    } else if (!form[field2]|| form[field2] === '') {
      errors[field2] = `Пожалуйста вновь введите ${names[field1]}`
    } else if (form[field2] !== form[field1]) {
      errors[field2] = `Вы ошиблись вновь вводя ${names[field1]}, пожалуйста повторите`
    }
  }


  let newFuncs = {}

  for (let i in funcs) {
    newFuncs[i] = (...args) => {
      if (args[0][args[2]].hasOwnProperty('value')) {
        args[0] = {...args[0], [args[2]]:args[0][args[2]].value}
      }
      funcs[i](...args)
    }
  }
  return newFuncs
}


export const {validateRequired,
              validateTwoEqualFields,
              validateType} = getValue()

              // funcs.fullyValidateEmail = (form, errors, field) => {
              //   if (!form[field] || form[field] === '') {
              //     errors[field] = 'Пожалуйста введите email'
              //   } else if (!validateEmail(form[field])) {
              //     errors[field] = 'Извините email адрес введен неправильно, повторите ввод'
              //   }
              // }
