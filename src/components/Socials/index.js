import React from 'react'
import clsx from 'clsx'
import SOCIALS from './constants'
import s from './Socials.module.scss'

const Socials = ({ variant, className }) => {
  return (
    <ul className={clsx(s.socials, { [s[variant]]: variant }, className)}>
      {SOCIALS.map(({ name, Icon, link }) => (
        <li key={name} className={s.socials_item}>
          <a
            aria-label={name}
            target="_blank"
            href={link}
            rel="noreferrer"
            className={s.socials_link}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Socials
