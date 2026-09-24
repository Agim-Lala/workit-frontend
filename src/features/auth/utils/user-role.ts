import type { AuthUser, UserRole, UserRoleName } from '../types/auth.types'

const roleCodes: Record<UserRoleName, number> = {
  Worker: 0,
  Business: 1,
  Admin: 2,
}

export function hasUserRole(role: UserRole, expectedRole: UserRoleName) {
  return role === expectedRole || role === roleCodes[expectedRole]
}

export function getDefaultAuthenticatedPath(user: AuthUser | null) {
  if (user && hasUserRole(user.role, 'Business')) {
    return '/business'
  }

  if (user && hasUserRole(user.role, 'Worker')) {
    return '/jobs'
  }

  return '/'
}

export function isEmailConfirmed(user: AuthUser) {
  return user.emailConfirmationStatus === 'Confirmed' || user.emailConfirmationStatus === 1
}
