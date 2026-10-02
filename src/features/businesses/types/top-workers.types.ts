export type TopWorker = {
  workerProfileId: string
  firstName: string
  lastName: string
  location: string
  hasCv: boolean
  cvMatchesRole: boolean
  cvYearsOfExperience: number | null
  cvLanguagesCount: number
  matchesInterestedFields: boolean
  matchesPreferredShiftType: boolean
  completedJobsCount: number
  completedSameRoleJobsCount: number
  averageRating: number | null
  reviewsCount: number
  score: number
}

export type TopWorkersResponse = {
  items: TopWorker[]
}
