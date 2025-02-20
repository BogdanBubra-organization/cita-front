import React from 'react'
import { useTranslations } from 'next-intl'

const Thankyou = () => {
  const t = useTranslations('Thankyou')

  return (
    <section className="container simple-page" data-aos="zoom-in">
      <h1 className="h2">{t('title')}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: t.raw('content') }}
        className="simple-content simple-content--centered"
      />
    </section>
  )
}

export default Thankyou
