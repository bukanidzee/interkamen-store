export const readableNameAndInitials = (owner) => {
  return `${owner.last_name} ${owner.first_name ? owner.first_name[0] + '.' : ''}${owner.third_name ? owner.third_name[0] + '.' : ''}`
}
