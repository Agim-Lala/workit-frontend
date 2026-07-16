import { create } from 'zustand'

import type { JobFilters } from '../types/job.types'

type JobFilterState = JobFilters & {
  setSearch: (search: string) => void
  setRole: (role: string) => void
  setPayType: (payType: JobFilters['payType']) => void
}

export const useJobFilters = create<JobFilterState>((set) => ({
  search: '',
  role: 'All',
  payType: 'Any',
  setSearch: (search) => set({ search }),
  setRole: (role) => set({ role }),
  setPayType: (payType) => set({ payType }),
}))
