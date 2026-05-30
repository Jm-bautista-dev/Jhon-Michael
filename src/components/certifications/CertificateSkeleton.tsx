import { cn } from '../../lib/cn'

interface CertificateSkeletonProps {
  className?: string
}

export function CertificateSkeleton({ className }: CertificateSkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-surface-muted', className)}
      aria-hidden
    >
      <div className="flex h-full flex-col gap-3 p-6">
        <div className="mx-auto h-3 w-1/3 rounded bg-border" />
        <div className="mx-auto mt-4 h-6 w-2/3 rounded bg-border" />
        <div className="mx-auto h-4 w-1/2 rounded bg-border" />
        <div className="mt-auto space-y-2">
          <div className="h-3 w-full rounded bg-border" />
          <div className="h-3 w-4/5 rounded bg-border" />
        </div>
      </div>
    </div>
  )
}
