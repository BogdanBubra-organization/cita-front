import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import s from './About.module.scss'

const About = () => {
  const t = useTranslations('About')

  const STATS = [
    {
      value: '300+',
      label: t('stats1'),
    },
    {
      value: '7500+',
      label: t('stats2'),
    },
  ]

  return (
    <section id="about">
      <div className={clsx('container', s.about)}>
        <div data-aos="fade-down" className={s.about_heading}>
          <h2>{t('title')}</h2>

          <div className={s.about_stats}>
            {STATS.map(({ value, label }, i) => (
              <div key={i} className={s.about_stats_item}>
                <span className={s.about_stats_value}>{value}</span>
                <span className={s.about_stats_label}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p data-aos="fade-up" className={s.about_descr}>
          {t('descr')}
        </p>
      </div>
    </section>
  )
}

export default About
