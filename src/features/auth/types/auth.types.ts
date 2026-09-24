export type UserRoleName = 'Worker' | 'Business' | 'Admin'
export type UserRoleCode = 0 | 1 | 2
export type UserRole = UserRoleName | UserRoleCode

// The API serializes enums as numbers; names are accepted too, matching UserRole.
export type EmailConfirmationStatusName = 'Pending' | 'Confirmed' | 'Expired'
export type EmailConfirmationStatus = EmailConfirmationStatusName | 0 | 1 | 2

export type AuthUser = {
  id: string
  email: string
  role: UserRole
  roleLabel: string
  emailConfirmationStatus: EmailConfirmationStatus
  emailConfirmationStatusLabel: string
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
  // Omit both to let the API geocode fullAddress.
  latitude?: number
  longitude?: number
  nipt: string
  phone?: string
}
