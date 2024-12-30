import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Form from '../Form'
import s from './Order.module.scss'

const Order = () => {
  const t = useTranslations('Order')

  return (
    <section id="order">
      <div className={clsx('container', s.order)}>
        <div className={s.order_content}>
          <h2 data-aos="fade-right">{t('title')}</h2>

          <p data-aos="fade-left" className="lead">
            {t.rich('descr', {
              br: () => <br />,
            })}
          </p>
        </div>

        <Form variant="order" />
      </div>
    </section>
  )
}

export default Order
