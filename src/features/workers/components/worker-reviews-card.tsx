import { Star } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'

import { useWorkerReviews } from '../hooks/use-worker-reviews'

export function WorkerReviewsCard({ workerProfileId }: { workerProfileId: string }) {
  const t = useT()
  const [page, setPage] = useState(1)
  const reviewsQuery = useWorkerReviews(workerProfileId, page)
  const reviews = reviewsQuery.data

  return (
    <div className="courtyard-surface p-6 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="display-type text-3xl font-bold">{t('workerProfile.reviews.title')}</h2>
          <p className="mt-2 max-w-[60ch] text-sm leading-6 text-muted-foreground">
            {t('workerProfile.reviews.body')}
          </p>
        </div>
        {reviews && reviews.averageRating !== null ? (
          <div className="text-right">
            <p className="display-type text-4xl font-bold leading-none">
              {reviews.averageRating.toFixed(1)}
            </p>
            <StarRating className="mt-1 justify-end" rating={reviews.averageRating} />
            <p className="mt-1 text-xs text-muted-foreground">
              {t('workerProfile.reviews.count', { count: reviews.totalCount })}
            </p>
          </div>
        ) : null}
      </div>

      <div aria-live="polite" className="mt-6">
        {reviewsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">{t('workerProfile.reviews.loading')}</p>
        ) : reviewsQuery.isError && !reviews ? (
          <p className="text-sm text-destructive" role="alert">{t('workerProfile.reviews.error')}</p>
        ) : reviews && reviews.items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('workerProfile.reviews.empty')}</p>
        ) : (
          <ul className="divide-y divide-border">
            {reviews?.items.map((review) => (
              <li className="py-4 first:pt-0" key={review.id}>
                <div className="flex items-center justify-between gap-3">
                  <StarRating rating={review.rating} />
                  <time className="text-xs text-muted-foreground" dateTime={review.createdAt}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </time>
                </div>
                {review.comment ? (
                  <p className="mt-2 text-sm leading-6 text-foreground">{review.comment}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      {reviews && reviews.totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            disabled={!reviews.hasPreviousPage || reviewsQuery.isFetching}
            onClick={() => setPage((current) => current - 1)}
            size="sm"
            type="button"
            variant="secondary"
          >
            {t('workerProfile.reviews.previous')}
          </Button>
          <span className="text-xs text-muted-foreground">
            {t('workerProfile.reviews.page', { page: reviews.page, total: reviews.totalPages })}
          </span>
          <Button
            disabled={!reviews.hasNextPage || reviewsQuery.isFetching}
            onClick={() => setPage((current) => current + 1)}
            size="sm"
            type="button"
            variant="secondary"
          >
            {t('workerProfile.reviews.next')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function StarRating({ rating, className }: { rating: number; className?: string }) {
  const t = useT()
  const rounded = Math.round(rating)

  return (
    <span
      aria-label={t('workerProfile.reviews.stars', { rating: rating.toFixed(1) })}
      className={cn('flex gap-0.5', className)}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          aria-hidden="true"
          className={star <= rounded ? 'fill-primary text-primary' : 'text-border'}
          key={star}
          size={16}
        />
      ))}
    </span>
  )
}
