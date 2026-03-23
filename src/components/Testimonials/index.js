'use client'

import React from 'react'
import { ElfsightWidget } from 'next-elfsight-widget'
import { useTranslations, useLocale } from 'next-intl'

const Testimonials = () => {
	const locale = useLocale()
	const t = useTranslations('Testimonials')

	const getLocalizedWidgetID = () => {
		switch (locale) {
			case 'uk':
				return 'b690080e-436e-4a5e-b01c-eea2ac7c0903'
			case 'en':
				return '9dfd0294-2c34-4a17-82ed-2b67174e0455'
			case 'es':
				return 'd92fccc3-b9ed-4076-bc46-539a5fa2ae7c'
			default:
				return 'b690080e-436e-4a5e-b01c-eea2ac7c0903'
		}
	}

	return (
		<section className="container simple-page">
			<h1 className="h2">{t('title')}</h1>
			<ElfsightWidget widgetId={getLocalizedWidgetID()}/>
		</section>
	)
}

export default Testimonials
