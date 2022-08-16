import {readableNameAndInitials} from './readableNameAndInitials'

export const changeReadableFullname = (fullname, field) => {
  const format = /(?<last_name>[a-zA-Zа-яА-Я]+)\s(?<first_name>[a-zA-Zа-яА-Я]+)\.(?<third_name>[a-zA-Zа-яА-Я]*)/

  let names = fullname.match(format).groups
  const fieldName = Object.keys(field)[0]
  names[fieldName] = field[fieldName]
  return readableNameAndInitials(names)
}
