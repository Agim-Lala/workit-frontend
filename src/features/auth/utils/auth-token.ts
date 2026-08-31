import type { AuthUser } from '../types/auth.types'

const accessTokenKey = 'workit.accessToken'
const authUserKey = 'workit.user'

export function getAccessToken() {
  return window.localStorage.getItem(accessTokenKey)
}

export function setAccessToken(accessToken: string) {
  window.localStorage.setItem(accessTokenKey, accessToken)
}

export function setAuthSession(accessToken: string, user: AuthUser) {
  setAccessToken(accessToken)
  window.localStorage.setItem(authUserKey, JSON.stringify(user))
}

export function getStoredUser(): AuthUser | null {
  const storedUser = window.localStorage.getItem(authUserKey)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as AuthUser
  } catch {
    window.localStorage.removeItem(authUserKey)
    return null
  }
}

export function clearAccessToken() {
  window.localStorage.removeItem(accessTokenKey)
  window.localStorage.removeItem(authUserKey)
}
