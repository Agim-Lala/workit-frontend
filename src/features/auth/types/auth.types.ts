export type UserRole = 'Worker' | 'Business' | 'Admin' | number

export type AuthUser = {
  id: string
  email: string
  role: UserRole
}

export type LoginCredentials = {
  email: string
  password: string
}
