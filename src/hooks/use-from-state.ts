import { useLocation } from 'react-router-dom'

/** Link state for pages with a BackLink, so "Back" returns to the page the user came from. */
export function useFromState() {
  const { pathname, search } = useLocation()

  return { from: `${pathname}${search}` }
}
