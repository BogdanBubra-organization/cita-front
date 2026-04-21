'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import btn from '@/components/Button/Button.module.scss'
import { TELEGRAM_BOT_HREF } from '@/components/Socials/constants'
import TelegramIcon from '@/assets/icons/telegram.svg'
import WhatsAppIcon from '@/assets/icons/whatsapp.svg'
import s from './Messengers.module.scss'

const CHANNELS = [
  {
    name: 'Telegram',
    href: TELEGRAM_BOT_HREF,
    variant: 'telegram',
    Icon: TelegramIcon,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/34696417072',
    variant: 'whatsapp',
    Icon: WhatsAppIcon,
  },
]

const Messengers = () => {
  const t = useTranslations('Messengers')

  return (
    <section className={clsx('container', 'simple-page', s.messengers)}>
      <h1 className="h2" data-aos="fade-up">
        {t('title')}
      </h1>

      <p
        className={clsx('lead', s.messengers_descr)}
        data-aos="fade-up"
        data-aos-delay={50}
      >
        {t('description')}
      </p>

      <ul className={s.messengers_list} data-aos="fade-up" data-aos-delay={100}>
        {CHANNELS.map(({ name, href, variant, Icon }) => (
          <li key={href} className={s.messengers_item}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                btn.btn,
                s.messengers_btn,
                variant === 'telegram' && s.messengers_btnTelegram,
                variant === 'whatsapp' && s.messengers_btnWhatsApp
              )}
            >
              <Icon className={s.messengers_btnIcon} aria-hidden />
              {name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Messengers
