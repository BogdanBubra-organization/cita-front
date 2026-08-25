import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import CONTACTS from './constants'
import s from './Contacts.module.scss'

const Contacts = () => {
  const t = useTranslations('Contacts')

  return (
    <section id="contacts" className={s.wrap}>
      <div className="container">
        <div className={s.contacts}>
          <div data-aos="fade-up" className={s.contacts_heading}>
            <h2>{t('title')}</h2>
            <p className="lead">{t('description')}</p>
          </div>

          <ul className={s.contacts_list}>
            {CONTACTS.map(({ id, href, Icon, handle, variant }, i) => {
              const isLink = Boolean(href)
              const Tag = isLink ? 'a' : 'span'
              const name = t(`items.${id}`)
              const subtitle = isLink ? handle : t('soon')

              return (
                <li
                  key={id}
                  data-aos="fade-up"
                  data-aos-delay={Math.min(i * 50, 250)}
                >
                  <Tag
                    className={clsx(s.contacts_card, !isLink && s.contacts_soon)}
                    data-variant={variant}
                    {...(isLink
                      ? {
                          href,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          'aria-label': `${name} ${handle}`,
                        }
                      : {
                          'aria-disabled': true,
                          'aria-label': `${name}. ${t('soon')}`,
                        })}
                  >
                    <span className={s.contacts_icon} aria-hidden>
                      <Icon />
                    </span>
                    <span className={s.contacts_meta}>
                      <span className={s.contacts_name}>{name}</span>
                      <span className={s.contacts_handle}>{subtitle}</span>
                    </span>
                  </Tag>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contacts
