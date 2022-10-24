export const readableNameAndInitials = (owner) => {
  const user = {}
  for (let field of ['first_name', 'last_name', 'third_name']) {
    user[field] = owner[field].hasOwnProperty('value') ?
                    owner[field].value
                  : owner[field]
  }
  return `${user.last_name} ${user.first_name ? user.first_name[0] + '.' : ''}${user.third_name ? user.third_name[0] + '.' : ''}`
}
