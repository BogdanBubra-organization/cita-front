'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import useNearViewport from '@/hooks/useNearViewport'
import s from './Testimonials.module.scss'

const ElfsightWidget = dynamic(
  () => import('next-elfsight-widget').then((module) => module.ElfsightWidget),
  { ssr: false }
)

const Testimonials = ({
  variant = 'main',
  asPageTitle = variant === 'page',
}) => {
  const t = useTranslations('Testimonials')
  const HeadingTag = asPageTitle ? 'h1' : 'h2'
  const { elementRef, isNearViewport } = useNearViewport()

  return (
    <section className="simple-page">
      <div className="container">
        <HeadingTag className="h2" data-aos="fade-up">
          {t('title')}
        </HeadingTag>
        <div
          ref={elementRef}
          className={s.widget}
          data-aos="fade-up"
          data-aos-delay={50}
        >
          {isNearViewport && (
            <ElfsightWidget widgetId={t(`widgetId_${variant}`)} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
