import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import * as Accordion from '@radix-ui/react-accordion'
import s from './FAQ.module.scss'

const FAQ = () => {
  const t = useTranslations('FAQ')

  const list = t.raw('list')

  return (
    <section id="faq" className={clsx('container', s.faq)}>
      <h2 data-aos="fade-right">{t('title')}</h2>

      <Accordion.Root type="single" collapsible className={s.faq_list}>
        {list.map((item, i) => (
          <Accordion.Item
            key={i}
            value={'a' + i}
            data-aos="fade-up"
            data-aos-delay={i * 200}
            className={s.faq_item}
          >
            <Accordion.Trigger className={s.faq_title}>
              {item.q}
            </Accordion.Trigger>
            <Accordion.Content className={s.faq_content}>
              <p className={s.faq_text}>{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}

export default FAQ
