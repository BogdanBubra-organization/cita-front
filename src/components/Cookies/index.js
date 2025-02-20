'use client'

import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { GoogleTagManager } from '@/components/tracking/GoogleTagManager'
import Button from '@/components/Button'
import s from './Cookies.module.scss'

const Cookies = () => {
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    setStatus(consent || null)
    setShow(!consent)
  }, [])

  const handleConsent = (answer) => {
    localStorage.setItem('cookieConsent', answer)
    setStatus(answer)
    setShow(false)
  }

  const t = useTranslations('Cookies')

  return (
    <>
      <div className={clsx(s.cookies, { [s.show]: show })}>
        <div className={s.cookies_content}>
          <div className={s.cookies_title}>{t('title')}</div>

          <p>{t('descr')}</p>
        </div>

        <div className={s.cookies_btns}>
          <Button size="sm" onClick={() => handleConsent('granted')}>
            {t('accept')}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleConsent('denied')}
          >
            {t('decline')}
          </Button>
        </div>
      </div>

      <GoogleTagManager status={status} />
    </>
  )
}

export default Cookies
