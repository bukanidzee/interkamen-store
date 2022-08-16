export const getReadableSelectOption = (option) => {
  return `${option.username} - ${option.last_name} ${option.first_name}${option.third_name ? ` ${option.third_name}` : ''}`
}
