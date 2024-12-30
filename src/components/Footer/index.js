'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Socials from '../Socials'
import Menu from '../Menu'
import visa from '@/assets/img/visa.png'
import mastercard from '@/assets/img/mastercard.png'
import logo from '@/assets/img/logo-white.svg?url'
import LINKS from '@/constants/links'
import s from './Footer.module.scss'
import { LEGAL_EMAIL } from "@/constants/constants";

const Footer = () => {
  const [emailIsVisible, setEmailIsVisible] = useState(false)
  setTimeout(() => setEmailIsVisible(true), 4000)

  const t = useTranslations('Footer')
  const currentYear = new Date().getFullYear()
  return (
    <footer data-aos="fade" className={s.footer}>
      <div className={clsx('container', s.footer_inner)}>
        <div className={s.footer_top}>
          <p className={s.footer_slogan}>
            {t.rich('slogan', {
              br: () => <br />,
              accent: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <div className={s.footer_info}>
            <Socials variant="footer" />

            <div className={s.footer_links}>
              {LINKS.policy && <Link href={LINKS.policy}>{t('policy')}</Link>}
              {LINKS.offer && <Link href={LINKS.offer}>{t('offer')}</Link>}
            </div>

            <div className={s.footer_payments}>
              <Image src={visa} alt="Visa" />
              <Image src={mastercard} alt="Mastercard" />
            </div>
          </div>
        </div>

        <div className={s.footer_bottom}>
          <Image src={logo} alt="Logo" className={s.footer_logo} />
          <Menu variant="footer" />
          <p className={s.footer_copy}>
            © Cita Master {currentYear}. {t('copy')}
          </p>
        </div>
        <div className={s.footer_legal}>
          <p className={s.footer_copy}>
            {t('legal')} {emailIsVisible ? LEGAL_EMAIL : '[loading, please wait...]'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
