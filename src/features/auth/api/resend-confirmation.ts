import { apiClient } from '@/lib/api-client'

export async function resendConfirmation(email: string): Promise<void> {
  await apiClient.post('/auth/resend-confirmation', { email })
}
