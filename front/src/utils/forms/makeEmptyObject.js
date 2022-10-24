export const makeEmptyObject = (array) => {
  let object = {}
  for (let field of array) {
    object[field] = ''
  }
  return object
}

export const makeEmptyTwoStatesObject = (array) => {
  let object = {}
  for (let field of array) {
    object[field] = {value: '',
                     initialValue: '',
                     // state: 'notActive'
                   }
  }
  return object
}
