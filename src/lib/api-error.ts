import { isAxiosError } from 'axios'

import type { ApiError } from '@/types/api.types'

/** Extracts the API's structured error body from a caught axios error, if present. */
export function getApiError(error: unknown): ApiError | null {
  if (isAxiosError(error) && error.response?.data) {
    return error.response.data as ApiError
  }

  return null
}

export function isRateLimited(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 429
}

/** Converts a PascalCase FluentValidation property name (e.g. "BusinessName") to the
 * matching camelCase form field name (e.g. "businessName"). */
export function toFieldName(propertyName: string): string {
  return propertyName.charAt(0).toLowerCase() + propertyName.slice(1)
}
