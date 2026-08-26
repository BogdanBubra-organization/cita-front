'use client'

import React from 'react'
import { ElfsightWidget } from 'next-elfsight-widget'
import { useTranslations } from 'next-intl'

const Testimonials = ({
	variant = 'main',
	asPageTitle = variant === 'page',
}) => {
	const t = useTranslations('Testimonials')
	const HeadingTag = asPageTitle ? 'h1' : 'h2'

	return (
		<section className="simple-page">
			<div className="container">
				<HeadingTag className="h2" data-aos="fade-up">
					{t('title')}
				</HeadingTag>
				<div data-aos="fade-up" data-aos-delay={50}>
					<ElfsightWidget widgetId={t(`widgetId_${variant}`)} />
				</div>
			</div>
		</section>
	)
}

export default Testimonials
