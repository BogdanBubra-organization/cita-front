'use client'

import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import useClickOutside from '@/hooks/useClickOutside'
import LangList from '../LangList'
import Lang from '@/assets/icons/lang.svg'
import s from './LangSwitcher.module.scss'

const LangSwitcher = ({ className }) => {
  const langRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  useClickOutside(langRef, () => {
    setIsOpen(false)
  })

  return (
    <div ref={langRef} className={clsx(s.langSwitcher, className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(s.langSwitcher_btn, { [s.active]: isOpen })}
      >
        <Lang />
      </button>

      <LangList
        setIsOpen={setIsOpen}
        className={clsx(s.langSwitcher_list, { [s.show]: isOpen })}
      />
    </div>
  )
}

export default LangSwitcher
