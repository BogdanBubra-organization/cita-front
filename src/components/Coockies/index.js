'use client'

import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Icon from '@/assets/icons/close.svg'
import s from './Coockies.module.scss'

const Coockies = () => {
  const [consentGiven, setConsentGiven] = useState(true)

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent')
    hasConsent ? setConsentGiven(true) : setConsentGiven(false)
  }, [])

  const handleConsent = () => {
    localStorage.setItem('cookieConsent', 'true')
    setConsentGiven(true)
  }

  const t = useTranslations('Coockies')

  return (
    <div className={clsx(s.coockies, { [s.show]: !consentGiven })}>
      <div className={s.coockies_title}>
        {t('title')}

        <button
          type="button"
          aria-label="Close"
          onClick={handleConsent}
          className={s.coockies_btn}
        >
          <Icon />
        </button>
      </div>

      <p>{t('descr')}</p>
    </div>
  )
}

export default Coockies
