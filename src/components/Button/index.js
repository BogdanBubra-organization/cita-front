import React from 'react'
import clsx from 'clsx'
import AnchorLink from '../AnchorLink'
import s from './Button.module.scss'

const Button = ({
  variant = 'primary',
  type = 'button',
  disabled,
  handleClose,
  size,
  href,
  children,
  onClick,
  className,
}) => {
  if (href) {
    return (
      <AnchorLink
        label={children}
        link={href}
        handleClose={handleClose}
        className={clsx(
          s.btn,
          s[`btn--${variant}`],
          { [s[`btn--${size}`]]: size },
          className
        )}
      />
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        s.btn,
        s[`btn--${variant}`],
        { [s[`btn--${size}`]]: size },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
