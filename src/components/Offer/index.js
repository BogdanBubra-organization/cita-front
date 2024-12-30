import React from 'react'
import { useTranslations } from 'next-intl'
import Iframe from 'react-iframe'

const Offer = () => {
  const t = useTranslations('Offer')

  return (
    <section className="container simple-page">
      <h1 className="h2">{t('title')}</h1>

      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{ __html: t.raw('content') }}*/}
      {/*  className="simple-content"*/}
      {/*/>*/}

        <Iframe url="https://api.citamaster.com/web/service-terms"
                width="100%"
                height="800px"
                id=""
                className=""
                display="block"
                position="relative"/>
    </section>
  )
}

export default Offer
