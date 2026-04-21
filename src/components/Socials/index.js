'use client'

import React from 'react'
import clsx from 'clsx'
import { usePathname } from '@/i18n/routing'
import SOCIALS, { TELEGRAM_BOT_HREF } from './constants'
import s from './Socials.module.scss'

const Socials = ({ variant, className }) => {
  const pathname = usePathname()
  const isMessengersPage = pathname === '/messengers'

  return (
    <ul className={clsx(s.socials, { [s[variant]]: variant }, className)}>
      {SOCIALS.map(({ name, Icon, link }) => (
        <li key={name} className={s.socials_item}>
          <a
            aria-label={name}
            target="_blank"
            href={
              name === 'Telegram' && isMessengersPage
                ? TELEGRAM_BOT_HREF
                : link
            }
            rel="noreferrer"
            className={s.socials_link}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Socials
