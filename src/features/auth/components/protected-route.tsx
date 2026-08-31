import { Navigate, Outlet, useLocation } from 'react-router-dom'

import type { UserRoleName } from '../types/auth.types'
import { getAccessToken, getStoredUser } from '../utils/auth-token'
import {
  getDefaultAuthenticatedPath,
  hasUserRole,
} from '../utils/user-role'

export type AuthRedirectState = {
  returnTo?: string
}

export function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles?: UserRoleName[]
}) {
  const location = useLocation()
  const user = getStoredUser()

  if (!getAccessToken() || !user) {
    return (
      <Navigate
        replace
        state={{ returnTo: `${location.pathname}${location.search}` }}
        to="/login"
      />
    )
  }

  if (
    allowedRoles &&
    !allowedRoles.some((allowedRole) => hasUserRole(user.role, allowedRole))
  ) {
    return <Navigate replace to={getDefaultAuthenticatedPath(user)} />
  }

  return <Outlet />
}
