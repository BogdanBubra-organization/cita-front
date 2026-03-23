// 'use client'

import React from 'react'
// import { ElfsightWidget } from 'next-elfsight-widget'
import { useTranslations, useLocale } from 'next-intl'

const Testimonials = () => {
	const t = useTranslations('Testimonials')

	return (
		<section className="container simple-page">
			<h1 className="h2">{t('title')}</h1>

			{/*<ElfsightWidget widgetId={t('widgetId')}/>*/}
		</section>
	)
}

export default Testimonials
