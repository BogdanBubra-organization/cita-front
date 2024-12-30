import React, { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { routing, usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import s from './LangList.module.scss'
import clsx from 'clsx'

const LangList = ({ handleClose, setIsOpen, className }) => {
  const [isPending, startTransition] = useTransition()

  const t = useTranslations('Global')

  const curLang = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const onLangChange = (nextLocale) => {
    handleClose && handleClose()
    setIsOpen && setIsOpen(false)
    startTransition(() => {
      router.replace({ pathname, params }, { locale: nextLocale })
    })
  }

  return (
    <div className={clsx(s.langList, className)}>
      {routing.locales.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onLangChange(lang)}
          disabled={curLang === lang}
          className={s.langList_item}
        >
          {t('locale', { locale: lang })}
        </button>
      ))}
    </div>
  )
}

export default LangList
