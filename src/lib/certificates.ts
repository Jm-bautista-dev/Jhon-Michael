/** Build a URL-safe path for files in public/certificates/ */
export function certificatePath(filename: string) {
  const base = import.meta.env.BASE_URL
  const formattedBase = base.endsWith('/') ? base : `${base}/`
  return `${formattedBase}certificates/${encodeURIComponent(filename)}`
}

export function isPdfAsset(url: string) {
  if (!url) return false
  const clean = url.toLowerCase().split('?')[0].split('#')[0]
  return clean.endsWith('.pdf')
}
