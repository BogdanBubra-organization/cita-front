'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { pageview } from './utils.tracking'
import { usePathname, useSearchParams } from 'next/navigation'

export const GoogleTagManagerScripts = ({ gtmId }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isInitialized, setIsInitialized] = useState(false)

  // Track pageview on route change
  useEffect(() => {
    if (!isInitialized) return

    const query = searchParams.toString()
    const url = query ? `${pathname}?${query}` : pathname

    pageview(url)
  }, [isInitialized, pathname, searchParams])

  return (
    <>
      {/* Inline script to set up dataLayer and define window.gtag */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        onReady={() => setIsInitialized(true)}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){ window.dataLayer.push(arguments); };
            window.gtag('consent', 'default', {
              ad_storage: 'granted',
              analytics_storage: 'granted',
            });
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            window.gtag('js', new Date());
            window.gtag('config', '${gtmId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {isInitialized && (
        <Script
          id="gtm-script"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          strategy="lazyOnload"
        />
      )}
    </>
  )
}
