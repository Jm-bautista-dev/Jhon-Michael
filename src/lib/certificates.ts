/** Build a URL-safe path for files in public/certificates/ */
export function certificatePath(filename: string) {
  return `/certificates/${encodeURIComponent(filename)}`
}

export function isPdfAsset(url: string) {
  return url.toLowerCase().split('?')[0].endsWith('.pdf')
}
