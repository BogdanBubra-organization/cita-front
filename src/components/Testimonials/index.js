'use client'

import React from 'react'
import { ElfsightWidget } from 'next-elfsight-widget'
import { useTranslations } from 'next-intl'

const Testimonials = ({
	variant = 'main'
}) => {
	const t = useTranslations('Testimonials')

	return (
		<section className="simple-page">
			<div className="container">
				<h1 className="h2">{t('title')}</h1>
				<ElfsightWidget widgetId={t(`widgetId_${variant}`)} />
			</div>
		</section>
	)
}

export default Testimonials
