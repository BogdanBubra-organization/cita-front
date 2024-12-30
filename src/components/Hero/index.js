import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Button from '../Button'
import Socials from '../Socials'
import BtnPopup from '../BtnPopup'
import calendar from '@/assets/img/calendar.svg?url'
import s from './Hero.module.scss'

const Hero = () => {
  const t = useTranslations('Hero')

  const descr = t.raw('descr')

  return (
    <section className={s.hero} data-aos="fade-up">
      <div className={clsx('container', s.hero_inner)}>
        <div className={s.hero_content}>
          <h1 className={s.hero_title}>
            {t.rich('title', {
              br: () => <br />,
            })}
          </h1>

          <div className={s.hero_descr}>
            {descr.map((item, index) => (
              <p key={index} className={s.hero_descr_p}>
                {item}
              </p>
            ))}
          </div>

          <div className={s.hero_btns}>
            <Button variant="secondary" href="#order">
              {t('cta')}
            </Button>

            <BtnPopup />
          </div>

          <Image
            src={calendar}
            alt="Calendar"
            loading="eager"
            priority
            data-aos="zoom-in"
            className={s.hero_pic}
          />
        </div>
        <Socials variant="hero" className={s.hero_socials} />
      </div>
    </section>
  )
}

export default Hero
