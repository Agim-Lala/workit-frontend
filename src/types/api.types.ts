export type ApiError = {
  title: string
  status: number
  detail?: string
  errors?: Record<string, string[]>
}
