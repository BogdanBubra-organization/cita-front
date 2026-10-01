import React from 'react'
import clsx from 'clsx'
import CustomLink from '../CustomLink'
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
  ...props
}) => {
  if (href) {
    return (
      <CustomLink
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
      {...props}
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
