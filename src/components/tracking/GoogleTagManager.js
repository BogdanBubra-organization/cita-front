'use client'

import { Suspense, useEffect, useState } from 'react'
import { GoogleTagManagerScripts } from './GoogleTagManagerScripts'
import { grantConsentForEverything } from './utils.tracking'
import { GTM_IDS } from '@/constants/constants'

export const GoogleTagManager = ({ status }) => {
  const [isGtagLoaded, setIsGtagLoaded] = useState(false)
  const [hasSetConsent, setHasSetConsent] = useState(false)

  // Handle Consent
  useEffect(() => {
    if (isGtagLoaded && !hasSetConsent) {
      const consent = localStorage.getItem('cookieConsent')

      if (status === 'granted') {
        grantConsentForEverything()
        setHasSetConsent(true)
      }
    }
  }, [isGtagLoaded, hasSetConsent, status])

  return (
    <>
      <noscript>
        {GTM_IDS.map((id) => (
          <iframe
            key={id}
            src={`https://www.googletagmanager.com/ns.html?id=${id}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        ))}
      </noscript>
      {/* We need to use Suspense in order to access useSearchParams (see https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout) */}
      <Suspense>
        {GTM_IDS.map((id) => (
          <GoogleTagManagerScripts
            key={id}
            gtmId={id}
            onLoadCallback={() => setIsGtagLoaded(true)}
          />
        ))}
      </Suspense>
    </>
  )
}
