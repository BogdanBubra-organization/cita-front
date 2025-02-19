'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { pageview } from './utils.tracking'
import { usePathname, useSearchParams } from 'next/navigation'

export const GoogleTagManagerScripts = ({ gtmId, onLoadCallback }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track pageview on route change
  useEffect(() => {
    const url = pathname + searchParams.toString()

    pageview(url)
  }, [pathname, searchParams])

  return (
    <>
      {/* Inline script to set up dataLayer and define window.gtag */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            window.gtag = function(){ window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
            });
            window.gtag('config', '${gtmId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* Load the GTM script via src to enable onLoad callback */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
        onLoad={onLoadCallback}
      />
    </>
  )
}
