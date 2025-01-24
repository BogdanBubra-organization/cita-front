import React from 'react'
import { useTranslations } from 'next-intl'

const Offer = () => {
  const t = useTranslations('Offer')

  return (
    <section className="container simple-page">
      <h1 className="h2">{t('title')}</h1>

      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{ __html: t.raw('content') }}*/}
      {/*  className="simple-content"*/}
      {/*/>*/}

      <object data="https://api.citamaster.com/uploads/oferta.pdf" type="application/pdf" width="100%" height="1000px">
        <p><a style={{textDecoration: "underline"}} href='https://api.citamaster.com/web/service-terms'>{t('url')}</a></p>
      </object>

    </section>
  )
}

export default Offer
