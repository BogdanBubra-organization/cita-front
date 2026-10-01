'use client'

import { Suspense } from 'react'
import { GoogleTagManagerScripts } from './GoogleTagManagerScripts'
import { GTM_IDS } from '@/constants/constants'

export const GoogleTagManager = () => {
  return (
    <Suspense>
      {GTM_IDS.map((id) => (
        <GoogleTagManagerScripts key={id} gtmId={id} />
      ))}
    </Suspense>
  )
}
