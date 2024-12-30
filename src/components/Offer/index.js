import React from 'react'
import { useTranslations } from 'next-intl'

const Offer = () => {
  const t = useTranslations('Offer')

  return (
    <section className="container simple-page">
      <h1 className="h2">{t('title')}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: t.raw('content') }}
        className="simple-content"
      />
    </section>
  )
}

export default Offer
