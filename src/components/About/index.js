import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import * as Accordion from '@radix-ui/react-accordion'
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

  const info_main = t.raw('info.main')
  const info_extra = t.raw('info.extra')

  return (
    <section id="about">
      <div className={clsx('container', s.about)}>
        <div data-aos="fade-down" className={s.about_heading}>
          <h2>
            {t.rich('title', {
              br: () => <br />,
            })}
          </h2>

          <div className={s.about_stats}>
            {STATS.map(({ value, label }, i) => (
              <div key={i} className={s.about_stats_item}>
                <span className={s.about_stats_value}>{value}</span>
                <span className={s.about_stats_label}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-up" className={s.about_content}>
          <p className="lead">
            {t.rich('lead', {
              br: () => <br />,
            })}
          </p>

          <div>
            <div className={s.about_info}>
              {info_main.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>

            <Accordion.Root type="single" collapsible className={s.about_extra}>
              <Accordion.Item value="extra">
                <Accordion.Content className={s.about_extra_content}>
                  <div className={s.about_info}>
                    {info_extra.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </Accordion.Content>
                <Accordion.Trigger
                  data-content={t('info.more')}
                  data-content-active={t('info.less')}
                  aria-label="Show more"
                  className={s.about_btn}
                ></Accordion.Trigger>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
