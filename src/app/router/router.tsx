import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/components/layouts/app-layout'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { ConfirmEmailPage } from '@/features/auth/pages/confirm-email-page'
import { LoginPage } from '@/features/auth/pages/login-page'
import { SignupPage } from '@/features/auth/pages/signup-page'
import { ApplicationsPage } from '@/features/applications/pages/applications-page'
import { BusinessDashboardPage } from '@/features/businesses/pages/business-dashboard-page'
import { BusinessLaunchPage } from '@/features/businesses/pages/business-launch-page'
import { BusinessOpeningsPage } from '@/features/businesses/pages/business-openings-page'
import { BusinessTopWorkersPage } from '@/features/businesses/pages/business-top-workers-page'
import { ForBusinessesPage } from '@/features/home/pages/for-businesses-page'
import { HomePage } from '@/features/home/pages/home-page'
import { HowItWorksPage } from '@/features/home/pages/how-it-works-page'
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
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'for-businesses', element: <ForBusinessesPage /> },
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
          { path: 'business/openings/:jobOpeningId/top-workers', element: <BusinessTopWorkersPage /> },
        ],
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/confirm-email', element: <ConfirmEmailPage /> },
])
