export const getInitials = (fullName: string) => {
  const names = fullName.split(' ')
  const initials = names.map((name) => name[0]).join('')
  return initials.toUpperCase()
}
