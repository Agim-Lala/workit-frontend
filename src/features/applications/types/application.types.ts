export type ApplicationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Withdrawn'
  | 'Cancelled'

export type JobApplication = {
  id: string
  jobId: string
  workerId: string
  status: ApplicationStatus
  appliedAt: string
}
