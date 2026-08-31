import { create } from 'zustand'

import type { JobFilters } from '../types/job.types'

type JobFilterState = JobFilters & {
  setSearch: (search: string) => void
  setJobType: (jobType: JobFilters['jobType']) => void
  setShiftType: (shiftType: JobFilters['shiftType']) => void
  setOnDate: (onDate: string) => void
  clearFilters: () => void
}

export const useJobFilters = create<JobFilterState>((set) => ({
  search: '',
  jobType: 'Any',
  shiftType: 'Any',
  onDate: '',
  setSearch: (search) => set({ search }),
  setJobType: (jobType) => set({ jobType }),
  setShiftType: (shiftType) => set({ shiftType }),
  setOnDate: (onDate) => set({ onDate }),
  clearFilters: () =>
    set({ search: '', jobType: 'Any', shiftType: 'Any', onDate: '' }),
}))
