import React from 'react'
import { useTranslations } from 'next-intl'

const Offer = () => {
  const t = useTranslations('Offer')

  return (
    <section className="container simple-page">
      <h1 className="h2">{t('title')}</h1>

        <iframe
            src="https://api.citamaster.com/uploads/oferta.html?v=1.4"
            width="100%"
            height="1000px"
            style={{padding: '16px', border: '1px solid #8e8e8e', borderRadius: '50px'}}
            frameBorder='0'
        />

    </section>
  )
}

export default Offer
