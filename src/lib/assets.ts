export function getAssetUrl(path: string | undefined): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const formattedBase = base.endsWith('/') ? base : `${base}/`

  // Avoid double prefixing if path already includes formattedBase or base
  if (base !== '/' && (path.startsWith(formattedBase) || path.startsWith(base))) {
    return path
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${formattedBase}${cleanPath}`
}

