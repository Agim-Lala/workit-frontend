export type UserRoleName = 'Worker' | 'Business' | 'Admin'
export type UserRoleCode = 0 | 1 | 2
export type UserRole = UserRoleName | UserRoleCode

export type AuthUser = {
  id: string
  email: string
  role: UserRole
  roleLabel: string
  emailConfirmed: boolean
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterWorkerRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  location: string
  phone?: string
}

export type RegisterBusinessRequest = {
  email: string
  password: string
  businessName: string
  fullAddress: string
  latitude: number
  longitude: number
  nipt: string
  phone?: string
}
