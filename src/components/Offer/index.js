import React from 'react'
import { useTranslations } from 'next-intl'
import { BACKEND_API_URL } from "@/constants/constants";

const Offer = () => {
  const t = useTranslations('Offer')

  return (
    <section className="container simple-page">
      <h1 className="h2">{t('title')}</h1>

        <iframe
            src={`${BACKEND_API_URL}/web/oferta/8c87d208-5d01-402c-b606-1d7f3425c827?v=1`}
            width="100%"
            height="1000px"
            style={{padding: '16px', border: '1px solid #8e8e8e', borderRadius: '50px'}}
            frameBorder='0'
        />

    </section>
  )
}

export default Offer
