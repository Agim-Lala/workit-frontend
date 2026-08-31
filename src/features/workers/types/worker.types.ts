export type WorkerProfile = {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string | null
  location: string
}

export type UpdateWorkerLocationResponse = {
  location: string
}
