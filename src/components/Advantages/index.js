import React from 'react'
import { useTranslations } from 'next-intl'
import Reload from '@/assets/icons/reload.svg'
import Calendar from '@/assets/icons/calendar.svg'
import List from '@/assets/icons/list.svg'
import Docs from '@/assets/icons/docs.svg'
import Chat from '@/assets/icons/chat.svg'
import s from './Advantages.module.scss'

const Advantages = () => {
  const t = useTranslations('Advantages')

  const LIST = [
    {
      Icon: Reload,
      descr: t('list.0'),
    },
    {
      Icon: Calendar,
      descr: t('list.1'),
    },
    {
      Icon: List,
      descr: t('list.2'),
    },
    {
      Icon: Docs,
      descr: t('list.3'),
    },
    {
      Icon: Chat,
      descr: t('list.4'),
    },
  ]

  return (
    <section id="advantages" className="container">
      <div className={s.advantages}>
        <h2 data-aos="fade-right" className={s.advantages_title}>
          {t('title')}
        </h2>

        <ul className={s.advantages_list}>
          {LIST.map(({ Icon, descr }, i) => (
            <li
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className={s.advantages_item}
            >
              <Icon className={s.advantages_icon} />

              {descr}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Advantages
