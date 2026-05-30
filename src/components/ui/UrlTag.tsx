import { cn } from '../../lib/cn'

interface UrlTagProps {
  url: string
  href?: string
  className?: string
}

export function UrlTag({ url, href, className }: UrlTagProps) {
  const inner = (
    <span
      className={cn(
        'inline-block rounded-md border border-border bg-surface-muted px-2 py-0.5',
        'font-mono text-xs text-muted dark:border-white/10 dark:bg-[#141414] dark:text-[#d4d4d4]',
        className,
      )}
    >
      {url}
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-block transition-opacity hover:opacity-80"
      >
        {inner}
      </a>
    )
  }

  return inner
}
