'use client'

import { GTM_ID } from '@/constants/constants'

const logGAWarning = (message) => {
  console.warn(message)
}

const getGtag = () => {
  if (!GTM_ID) {
    logGAWarning('Google Analytics is not enabled')
    return null
  }
  if (!window.gtag) {
    logGAWarning(`GTag does not exist`)
    throw new Error('GTag does not exist')
  }
  return window.gtag
}

export const grantConsentForEverything = () => {
  const gtag = getGtag()
  if (!gtag) return
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
  })
}

export const pageview = (url) => {
  const gtag = getGtag()
  if (!gtag) return
  gtag('config', GTM_ID, {
    page_path: url,
  })
}
