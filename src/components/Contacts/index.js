import React from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import CONTACTS from './constants'
import s from './Contacts.module.scss'

const Contacts = ({ variant = 'main' }) => {
  const t = useTranslations('Contacts')
  const isPage = variant === 'page'
  const HeadingTag = isPage ? 'h1' : 'h2'

  return (
    <section id="contacts" className={s.wrap}>
      <div className="container">
        <div data-aos="fade-up" className={s.contacts_heading}>
          <HeadingTag className={isPage ? 'h2' : undefined}>
            {t('title')}
          </HeadingTag>
          <p className="lead">{t('description')}</p>
        </div>

        <ul className={s.contacts_list}>
          {CONTACTS.map(({ id, href, Icon, handle, variant: cardVariant }, i) => {
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
                  data-variant={cardVariant}
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
    </section>
  )
}

export default Contacts
