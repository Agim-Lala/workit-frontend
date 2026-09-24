import { apiClient } from '@/lib/api-client'

export async function confirmEmail(token: string): Promise<void> {
  await apiClient.post('/auth/confirm-email', { token })
}
