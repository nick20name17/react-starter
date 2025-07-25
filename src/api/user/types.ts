export type Roles = 'admin' | 'user'

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: Roles
  date_joined: string
  last_active: string
  is_active: boolean
}
