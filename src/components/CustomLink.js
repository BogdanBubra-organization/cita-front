'use client'

import React from 'react'
import { handleScroll } from '@/utils/handleScroll'
import { routing, usePathname } from '@/i18n/routing'
import { Link } from '@/i18n/routing'

const CustomLink = ({
    label,
    link,
    handleClose,
    className,
    isAnchor = true,
}) => {
	const {locales, defaultLocale} = routing
	const pathname = usePathname()

	const nonDefaultLocales = locales.filter(( locale ) => locale !== defaultLocale)

	const isHomepage = new RegExp(`^/(${nonDefaultLocales.join('|')})?$`).test(pathname)

	const handleClick = ( e ) => {
		if (isAnchor) isHomepage && handleScroll(e, link)
		handleClose && handleClose()
	}

	return (<Link
			href={isHomepage ? link : `/${link}`}
			onClick={handleClick}
			className={className}
		>
			{label}
		</Link>)
}

export default CustomLink
