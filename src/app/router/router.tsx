import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layouts/app-layout'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { LoginPage } from '@/features/auth/pages/login-page'
import { SignupPage } from '@/features/auth/pages/signup-page'
import { ApplicationsPage } from '@/features/applications/pages/applications-page'
import { BusinessDashboardPage } from '@/features/businesses/pages/business-dashboard-page'
import { BusinessLaunchPage } from '@/features/businesses/pages/business-launch-page'
import { BusinessOpeningsPage } from '@/features/businesses/pages/business-openings-page'
import { HomePage } from '@/features/home/pages/home-page'
import { JobCalendarPage } from '@/features/jobs/pages/job-calendar-page'
import { JobDayPage } from '@/features/jobs/pages/job-day-page'
import { JobsPage } from '@/features/jobs/pages/jobs-page'
import { JobDetailsPage } from '@/features/jobs/pages/job-details-page'
import { WorkerProfilePage } from '@/features/workers/pages/worker-profile-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectedRoute allowedRoles={['Worker']} />,
        children: [
          { path: 'jobs', element: <JobsPage /> },
          { path: 'jobs/calendar', element: <JobCalendarPage /> },
          { path: 'jobs/calendar/:date', element: <JobDayPage /> },
          { path: 'jobs/:jobId', element: <JobDetailsPage /> },
          { path: 'applications', element: <ApplicationsPage /> },
          { path: 'worker-profile', element: <WorkerProfilePage /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['Business']} />,
        children: [
          { path: 'business', element: <BusinessDashboardPage /> },
          { path: 'business/openings', element: <BusinessOpeningsPage /> },
          { path: 'business/openings/new', element: <BusinessLaunchPage /> },
        ],
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
])
