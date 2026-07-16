import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/components/layouts/app-layout'
import { LoginPage } from '@/features/auth/pages/login-page'
import { ApplicationsPage } from '@/features/applications/pages/applications-page'
import { BusinessDashboardPage } from '@/features/businesses/pages/business-dashboard-page'
import { JobsPage } from '@/features/jobs/pages/jobs-page'
import { JobDetailsPage } from '@/features/jobs/pages/job-details-page'
import { WorkerProfilePage } from '@/features/workers/pages/worker-profile-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/jobs" replace /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'jobs/:jobId', element: <JobDetailsPage /> },
      { path: 'applications', element: <ApplicationsPage /> },
      { path: 'business', element: <BusinessDashboardPage /> },
      { path: 'worker-profile', element: <WorkerProfilePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
])
