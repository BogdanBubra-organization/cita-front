'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import useClickOutside from '@/hooks/useClickOutside'
import logo from '@/assets/img/logo.svg?url'
import Hamb from '@/assets/icons/hamb.svg'
import Close from '@/assets/icons/close.svg'
import LangSwitcher from '../LangSwitcher'
import Menu from '../Menu'
import LangList from '../LangList'
import BtnPopup from '../BtnPopup'
import s from './Header.module.scss'
import { Link } from '@/i18n/routing'

const Header = () => {
  const navRef = useRef(null)

  const [isNavOpen, setIsNavOpen] = useState(false)

  useClickOutside(navRef, () => {
    setIsNavOpen(false)
  })

  const handleNavOpen = () => {
    setIsNavOpen(true)
  }

  const handleNavClose = () => {
    setIsNavOpen(false)
  }

  return (
    <header
      data-state={isNavOpen ? 'open' : null}
      data-aos="fade-down"
      className={clsx('container', s.header)}
    >
      <div className={s.header_inner}>
        <Link href="/" className={s.header_logo}>
          <Image src={logo} alt="Logo" priority />
        </Link>

        <div
          ref={navRef}
          className={clsx(s.header_nav, { [s.open]: isNavOpen })}
        >
          <div className={s.header_nav_top}>
            <Image src={logo} alt="Logo" />

            <button
              type="button"
              aria-label="Close"
              className={s.header_close}
              onClick={handleNavClose}
            >
              <Close />
            </button>
          </div>

          <Menu variant="header" handleClose={handleNavClose} />

          <div className={s.header_nav_bottom}>
            <LangList handleClose={handleNavClose} />

            <BtnPopup handleClose={handleNavClose} />
          </div>
        </div>

        <LangSwitcher className={s.header_lang} />

        <BtnPopup size="sm" className={s.header_btn} />

        <button
          type="button"
          aria-label="Menu"
          className={s.header_hamb}
          onClick={handleNavOpen}
        >
          <Hamb />
        </button>
      </div>
    </header>
  )
}

export default Header
