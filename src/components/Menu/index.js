'use client'

import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import AnchorLink from '../AnchorLink'
import s from './Menu.module.scss'

const Menu = ({ handleClose, variant }) => {
  const t = useTranslations('Menu')

  const DATA = [
    {
      label: t('about'),
      link: '#about',
    },
    {
      label: t('advantages'),
      link: '#advantages',
    },
    {
      label: t('services'),
      link: '#services',
    },
    {
      label: t('faq'),
      link: '#faq',
    },
  ]

  return (
    <ul className={clsx(s.menu, { [s[variant]]: variant })}>
      {DATA.map((item) => (
        <li key={item.label} className={s.menu_item}>
          <AnchorLink
            {...item}
            handleClose={handleClose}
            className={s.menu_link}
          />
        </li>
      ))}
    </ul>
  )
}

export default Menu
