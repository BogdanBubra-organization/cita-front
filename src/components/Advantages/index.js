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
      ...t.raw('list.0'),
    },
    {
      Icon: Calendar,
      ...t.raw('list.1'),
    },
    {
      Icon: List,
      ...t.raw('list.2'),
    },
    {
      Icon: Docs,
      ...t.raw('list.3'),
    },
    {
      Icon: Chat,
      ...t.raw('list.4'),
    },
  ]

  return (
    <section id="advantages" className="container">
      <div className={s.advantages}>
        <h2 data-aos="fade-right" className={s.advantages_title}>
          {t('title')}
        </h2>

        <ul className={s.advantages_list}>
          {LIST.map(({ Icon, title, descr }, i) => (
            <li
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className={s.advantages_item}
            >
              <Icon className={s.advantages_icon} />

              <div className={s.advantages_content}>
                <strong className={s.advantages_item_title}>{title}</strong>
                <p>{descr}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Advantages
