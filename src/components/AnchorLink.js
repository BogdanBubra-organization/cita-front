'use client'

import React from 'react'
import { handleScroll } from '@/utils/handleScroll'
import { routing, usePathname } from '@/i18n/routing'

const AnchorLink = ({ label, link, handleClose, className }) => {
  const { locales, defaultLocale } = routing
  const pathname = usePathname()

  const nonDefaultLocales = locales.filter((locale) => locale !== defaultLocale)

  const isHomepage = new RegExp(`^/(${nonDefaultLocales.join('|')})?$`).test(
    pathname
  )

  const handleClick = (e) => {
    isHomepage && handleScroll(e, link)
    handleClose && handleClose()
  }

  return (
    <a
      href={isHomepage ? link : `/${link}`}
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  )
}

export default AnchorLink
