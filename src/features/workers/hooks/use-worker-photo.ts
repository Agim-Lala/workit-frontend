import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { fetchWorkerPhoto } from '../api/upload-worker-photo'

/**
 * The photo endpoint requires an auth header, so a plain `<img src>` can't load it directly.
 * Fetches the photo as a blob and exposes it as an object URL, refetching whenever
 * `photoUploadedAt` changes (a new upload) and revoking the previous URL on cleanup.
 *
 * This creates and tears down a real browser resource (the object URL) tied to fetched data —
 * a legitimate external-system effect, not the "derive state from props" anti-pattern the
 * set-state-in-effect lint rule otherwise guards against.
 */
export function useWorkerPhotoUrl(hasPhoto: boolean, photoUploadedAt: string | null) {
  const photoQuery = useQuery({
    queryKey: ['worker-photo', photoUploadedAt],
    queryFn: fetchWorkerPhoto,
    enabled: hasPhoto,
  })
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!photoQuery.data) {
      return
    }

    const objectUrl = URL.createObjectURL(photoQuery.data)
    // The state is a handle to the resource this effect creates, not a mirror of other state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhotoUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [photoQuery.data])

  return photoUrl
}
