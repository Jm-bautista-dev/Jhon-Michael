import { motion } from 'framer-motion'
import { useState } from 'react'
import { certifications } from '../data/certifications'
import type { Certification } from '../types'
import { easeOut } from '../lib/motion'
import { CertificationModal } from '../components/certifications/CertificationModal'
import { ListPageShell } from '../components/layout/ListPageShell'

function chunkRows<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size))
  }
  return rows
}

export function AllCertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const rows = chunkRows(certifications, 2)

  return (
    <>
      <ListPageShell title="All Certifications">
        <div className="space-y-0">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.04, duration: 0.4, ease: easeOut }}
              className="border-b border-border py-8 first:pt-0 last:border-b-0"
            >
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                {row.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="space-y-1 text-left transition-opacity hover:opacity-80"
                  >
                    <h2 className="text-lg font-bold text-foreground">{cert.title}</h2>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ListPageShell>

      <CertificationModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  )
}
